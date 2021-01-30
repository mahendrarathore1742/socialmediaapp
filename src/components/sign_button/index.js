import React, { useContext } from "react";
import "./style.css";
import { signInWithGoogle } from "../../services/auth";

import { userContext } from "../../contextApi/user";
const SignButton = () => {
  const [, setuser] = useContext(userContext).user;

  const signInBtnclick = async () => {
    let userbysignin = await signInWithGoogle();
    if (userbysignin) setuser(userbysignin);
  };

  return (
    <div className="signButton" onClick={signInBtnclick}>
      <p> sign in With google</p>
    </div>
  );
  
};
export default SignButton;
