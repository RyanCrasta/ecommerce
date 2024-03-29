import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import Cookies from "js-cookie";
import { TRPCError } from "@trpc/server";
import { env } from "process";
// import { api } from "~/trpc/server";

const secretKey = process.env.SECRET_CODE;
const key = new TextEncoder().encode(secretKey);

console.log("secretKey", key);

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(key);
}

export async function login({ email, password }) {
  // Verify credentials && get the user
  // console.log("formData", formData);
  const user = { email, password };
  // const hello = await api.login({ email, password });
  console.log("hello", hello);
  // Create the session
  const expires = new Date(Date.now() + 1000 * 100000);
  const session = await encrypt({ user, expires });

  Cookies.set("session", session);

  // Save the session in a cookie
  // cookies().set("session", session, { expires, httpOnly: true });
}

export async function decrypt(input) {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    throw new Error("gadbad", error);
  }
}

export const isUserLogIn = async (jwtToken) => {
  try {
    return await decrypt(jwtToken);
  } catch (e) {
    return Promise.reject();
  }
};
