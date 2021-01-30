import React, { createContext, useState } from "react";
export const userContext = createContext();
export const UserContextProvider = props => {
  const [user, setuser] = useState(null);

  return (
    <userContext.Provider value={{ user: [user, setuser] }}>
      {props.children}
    </userContext.Provider>
  );
};
