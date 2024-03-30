import { decrypt } from "lib.js";

export const isUserLogIn = async (
  /** @type {string | Uint8Array} */ jwtToken
) => {
  let payload = undefined;

  try {
    payload = await decrypt(jwtToken);
  } catch (e) {
    throw new Error("ERROR");
  }
};
