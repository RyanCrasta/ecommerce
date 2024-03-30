import { SignJWT, jwtVerify } from "jose";
const secretKey = process.env.SECRET_CODE;
const key = new TextEncoder().encode(secretKey);

/**
 * @param {import("jose").JWTPayload | undefined} payload
 */
export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("4h")
    .sign(key);
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
    throw new Error("error");
  }
}

export const isUserLogIn = async (
  /** @type {string | Uint8Array | undefined} */ jwtToken
) => {
  try {
    return await decrypt(jwtToken ?? "");
  } catch (e) {
    return Promise.reject();
  }
};
