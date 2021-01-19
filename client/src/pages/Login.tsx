import React from "react";
import { Navbar } from "../components/Navbar";

export const Login = () => {
  const imgSource = "google_signin.png";
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <div id="content" className="flex justify-center pt-8">
        <div>
          <h1 className="text-3xl mb-3 text-white flex justify-center">
            Sign In
          </h1>
          <ul className="flex">
            <li>
              <a href="http://localhost:5000/auth/google">
                <img src={imgSource} className="" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
