import React from "react";
import { Navbar } from "../components/Navbar";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";

export const Login = () => {
  return (
    <div>
      <Navbar />
      <h1 className="text-3xl mb-4">Login</h1>
      <ul className="flex">
        <li>
          <Link to="/auth/google" className="mr-2">
            Google
          </Link>
        </li>
      </ul>
    </div>
  );
};
