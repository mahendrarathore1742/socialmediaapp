import React, { useContext } from "react";
import { userContext } from "../../contextApi/user";
import { SignButton } from "../../components/";

import "./style.css";

const Navbar = () => {
  const [user, setuser] = useContext(userContext).user;
  return (
    <div className="navbar">
      <p> Insta App </p>
      {user ? (
        <>
          <img src={user.photoURL} className="photoURL" alt="" />
        </>
      ) : (
        <SignButton />
      )}
    </div>
  );
};

export default Navbar;
