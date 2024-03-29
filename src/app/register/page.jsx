"use client";

import { useEffect, useState } from "react";
import "~/styles/Register.css";
import { useRouter } from "next/navigation";
import { isUserLogIn } from "lib";
import Cookies from "js-cookie";
import { client } from "../_trpc/client";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInputsCorrect, setIsInputsCorrect] = useState(false);

  const [codeOne, setCodeOne] = useState("");
  const [codeTwo, setCodeTwo] = useState("");
  const [codeThree, setCodeThree] = useState("");
  const [codeFour, setCodeFour] = useState("");
  const [codeFive, setCodeFive] = useState("");
  const [codeSix, setCodeSix] = useState("");
  const [codeSeven, setCodeSeven] = useState("");
  const [codeEight, setCodeEight] = useState("");
  const [emailVerified, setEmailVerified] = useState(0);

  const router = useRouter();

  useEffect(() => {
    isUserLogIn(Cookies.get("session")).then(() => {
      router.push("/dashboard");
    });
  }, []);

  const createAccountHandler = (
    /** @type {{ preventDefault: () => void; }} */ e
  ) => {
    e.preventDefault();
    console.log(username, email, password);

    if (
      username.trim().length > 0 &&
      email.trim().length > 0 &&
      password.trim().length > 0
    ) {
      setIsInputsCorrect(true);
    } else {
      setIsInputsCorrect(false);
    }
  };

  const verifyBtnClicked = async () => {
    const code =
      codeOne +
      codeTwo +
      codeThree +
      codeFour +
      codeFive +
      codeSix +
      codeSeven +
      codeEight;
    // @ts-ignore
    const fAns = await client.emailCheck.query({ json: { code, email } });

    console.log("cccoooodddddeeee", fAns);

    if (fAns.json.check) {
      setEmailVerified(1);
    } else {
      setEmailVerified(2);
    }
  };

  return (
    <div id="formContainer">
      {!isInputsCorrect ? (
        <form id="registerForm">
          <label id="formHeader">Create your account</label>
          <label htmlFor="name">Name</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter"
            type="text"
            id="name"
            value={username}
          ></input>
          <label htmlFor="email">Email</label>

          <input
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter"
            type="email"
            id="email"
            value={email}
          ></input>
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter"
            type="password"
            id="password"
            value={password}
          ></input>
          <button onClick={createAccountHandler} id="ctaAccount">
            create account
          </button>
          <div id="loginOption">
            <label>Have an Account?</label>
            <input
              id="loginBtn"
              type="button"
              value="LOGIN"
              onClick={() => router.push("/login")}
            />
          </div>
        </form>
      ) : (
        <div id="emailVerifyForm">
          <p id="headerText">Verify your email</p>

          <p>Enter the 8 dgit code you have received on </p>
          <p>{email} </p>

          <div id="codeContainer">
            <p>Code</p>

            <div>
              <input
                type="text"
                maxLength={1}
                onChange={(e) => setCodeOne(e.target.value)}
              />
              <input
                type="text"
                maxLength={1}
                onChange={(e) => setCodeTwo(e.target.value)}
              />
              <input
                type="text"
                maxLength={1}
                onChange={(e) => setCodeThree(e.target.value)}
              />
              <input
                type="text"
                maxLength={1}
                onChange={(e) => setCodeFour(e.target.value)}
              />
              <input
                type="text"
                maxLength={1}
                onChange={(e) => setCodeFive(e.target.value)}
              />
              <input
                type="text"
                maxLength={1}
                onChange={(e) => setCodeSix(e.target.value)}
              />
              <input
                type="text"
                maxLength={1}
                onChange={(e) => setCodeSeven(e.target.value)}
              />
              <input
                type="text"
                maxLength={1}
                onChange={(e) => setCodeEight(e.target.value)}
              />
            </div>

            <button id="verifyCode" onClick={verifyBtnClicked}>
              verify
            </button>
          </div>

          {emailVerified === 1 && (
            <p id="message">Email verified successfully. Please login</p>
          )}
          {emailVerified === 2 && (
            <p id="message" className="errorMsg">
              Code incorrect
            </p>
          )}
        </div>
      )}
    </div>
  );
}
