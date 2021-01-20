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
          <ul className="flex flex-col">
            <li>
              <a
                className="button button--social-login button--google"
                href="http://localhost:5000/auth/google"
              >
                <i className="icon fa fa-google"></i>Login With Google
              </a>
            </li>
            <li>
              <a
                className="button button--social-login button--facebook"
                href="http://localhost:5000/auth/facebook"
              >
                <i className="icon fa fa-facebook"></i>Login With Facebook
              </a>
            </li>
            <li>
              <a
                className="button button--social-login button--twitter"
                href="http://localhost:5000/auth/twitter"
              >
                <i className="icon fa fa-twitter"></i>Login With Twitter
              </a>
            </li>
            <li>
              <a
                className="button button--social-login button--spotify"
                href="http://localhost:5000/auth/spotify"
              >
                <i className="icon fa fa-spotify"></i>Login With Spotify
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
