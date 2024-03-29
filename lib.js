import { SignJWT, jwtVerify } from "jose";
import Cookies from "js-cookie";

const secretKey = process.env.SECRET_CODE;
const key = new TextEncoder().encode(secretKey);

console.log("secretKey", key);

/**
 * @param {import("jose").JWTPayload | undefined} payload
 */
export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(key);
}

// @ts-ignore
export async function login({ email, password }) {
  // Verify credentials && get the user
  // console.log("formData", formData);
  const user = { email, password };
  // const hello = await api.login({ email, password });
  // Create the session
  const expires = new Date(Date.now() + 1000 * 100000);
  const session = await encrypt({ user, expires });

  Cookies.set("session", session);

  // Save the session in a cookie
  // cookies().set("session", session, { expires, httpOnly: true });
}

/**
 * @param {string | Uint8Array} input
 */
export async function decrypt(input) {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    throw new Error("gadbad");
  }
}

export const isUserLogIn = async (
  /** @type {string | Uint8Array | undefined} */ jwtToken
) => {
  try {
    // @ts-ignore
    return await decrypt(jwtToken);
  } catch (e) {
    return Promise.reject();
  }
};
