import React from "react";
import "./style.css";
import Home from "./pages";
import { UserContextProvider } from "./contextApi/user";
export default function App() {
  return (
    <UserContextProvider>
      <div className="app">
        <Home />
      </div>
    </UserContextProvider>
  );
}
