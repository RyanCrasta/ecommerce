import { decrypt } from "lib";


export const isUserLogIn = async (jwtToken) => {

    let payload = undefined;

    try {
        payload = await decrypt(jwtToken)
    }
}