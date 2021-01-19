import React from "react";
import { Navbar } from "../components/Navbar";

export const Login = () => {
  return (
    <div>
      <Navbar />
      <h1 className="text-3xl mb-3">Login</h1>
      <ul className="flex">
        <li>
          <a href="http://localhost:5000/auth/google">Google</a>
        </li>
      </ul>
    </div>
  );
};
