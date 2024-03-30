"use client";

import { useContext, useEffect, useState } from "react";
import "~/styles/Login.css";
import { encrypt, isUserLogIn } from "lib.cjs";
import { client } from "../_trpc/client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import UserContext from "utils/userContext";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setLoggedIn, loggedIn } = useContext(UserContext);
  const [btnClicked, setBtnClicked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    isUserLogIn(Cookies.get("session")).then(() => {
      router.push("/dashboard");
    });
  }, []);

  // @ts-ignore
  const loginHandler = async (e) => {
    e.preventDefault();
    if (email.trim().length > 0 && password.trim().length > 0) {
      // @ts-ignore
      const response = await client.login.query({ json: { email, password } });

      if (response.json.check) {
        const user = { email, password };
        const session = await encrypt(user);
        Cookies.set("session", session);
        setLoggedIn(true);
        router.push("/dashboard");
        setBtnClicked(true);

        if (!localStorage.getItem("checkedItem")) {
          localStorage.setItem("checkedItem", JSON.stringify([]));
        }
      } else {
        setLoggedIn(false);
        setBtnClicked(true);
      }
    } else {
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
        <div id="passwordContainer">
          <input
            onChange={(e) => {
              setPassword(e.target.value);
              setBtnClicked(false);
            }}
            required
            placeholder="Enter"
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
          ></input>
          <span
            id="showPassword"
            onClick={() => setShowPassword(!showPassword)}
          >
            Show
          </span>
        </div>
        <button onClick={loginHandler} id="ctaLogin">
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
