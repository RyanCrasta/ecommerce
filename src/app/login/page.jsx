"use client";

// @ts-ignore
import { use, useContext, useEffect, useState } from "react";
import "~/styles/Login.css";
// @ts-ignore
import { encrypt, isUserLogIn, login } from "lib.js";
import { client } from "../_trpc/client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import UserContext from "utils/userContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // @ts-ignore
  const [isInputsCorrect, setIsInputsCorrect] = useState(false);
  const router = useRouter();
  const { setLoggedIn, loggedIn } = useContext(UserContext);
  const [btnClicked, setBtnClicked] = useState(false);

  useEffect(() => {
    isUserLogIn(Cookies.get("session")).then(() => {
      router.push("/dashboard");
    });
  }, []);

  // @ts-ignore
  const createAccountHandler = async (e) => {
    e.preventDefault();
    console.log("LTI", email, password);

    if (email.trim().length > 0 && password.trim().length > 0) {
      setIsInputsCorrect(true);

      // @ts-ignore
      const fAns = await client.login.query({ json: { email, password } });

      console.log("rosy", fAns.json.check);

      if (fAns.json.check) {
        const expires = new Date(Date.now() + 1000 * 100000);
        const user = { email, password };
        // @ts-ignore
        const session = await encrypt(user, expires);
        Cookies.set("session", session);
        setIsInputsCorrect(true);
        // @ts-ignore
        setLoggedIn(true);
        router.push("/dashboard");
        setBtnClicked(true);

        if (!localStorage.getItem("checkedItem")) {
          localStorage.setItem("checkedItem", JSON.stringify([]));
        }
      } else {
        setIsInputsCorrect(false);
        // @ts-ignore
        setLoggedIn(false);
        setBtnClicked(true);
      }
    } else {
      setIsInputsCorrect(false);
      // @ts-ignore
      setLoggedIn(false);
      setBtnClicked(true);
    }
  };

  return (
    <div id="formContainer">
      <form id="loginForm">
        <label id="formHeader">Login</label>

        <p id="subheadingOne">Welcome back to ECOMMERCE</p>

        <p id="subHeadingTwo">The next gen business marketplace</p>

        <label htmlFor="email">Email</label>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
            setBtnClicked(false);
          }}
          required
          placeholder="Enter"
          type="email"
          id="email"
          value={email}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
            setBtnClicked(false);
          }}
          required
          placeholder="Enter"
          type="password"
          id="password"
          value={password}
        ></input>

        <button onClick={createAccountHandler} id="ctaAccount">
          login
        </button>

        <hr id="horizontalLine" />

        <div id="loginOption">
          <label>Don't have an Account?</label>
          <input
            id="loginBtn"
            type="button"
            value="SIGN UP"
            onClick={() => router.push("/register")}
          />
        </div>

        {!loggedIn && btnClicked && <p id="errorMsg">Invalid Credentials</p>}
      </form>
    </div>
  );
}
