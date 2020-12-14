import React from "react";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";

export const Navbar = (props: any) => {
  return (
    <nav className="z-20 flex items-center justify-between flex-wrap bg-gray-900 border-solid border-b-2 border-red-600 pl-6 pr-6 pt-3 pb-3 shadow-lg inset-x-0 top-0 object-top sticky mb-5">
      <div className="flex">
        <div className="my-auto pr-1">
          <ul className="flex text-white">
            <li>
              <Link to="/" className="mr-2">
                Home
              </Link>
            </li>

            {props.authenticated ? (
              <li>
                <a href="http://localhost:5000/auth/logout" className="mr-2">
                  Logout
                </a>
              </li>
            ) : (
              <li>
                <Link to="/login" className="mr-2">
                  Login
                </Link>
              </li>
            )}
            {/* Need to implement redux store so that the authenticated state will be available via ALL components */}
            {props.authenticated ? (
              <li>
                <Link to="/profile" className="mr-2">
                  Profile
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
};
