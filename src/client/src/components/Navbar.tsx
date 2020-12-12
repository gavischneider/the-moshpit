import React from "react";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="z-20 flex items-center justify-between flex-wrap bg-gray-900 border-solid border-b-2 border-red-600 pl-6 pr-6 pt-3 pb-3 shadow-lg inset-x-0 top-0 object-top sticky mb-5">
      <div className="flex">
        <div className="my-auto pr-1">
          <ul className="flex">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
