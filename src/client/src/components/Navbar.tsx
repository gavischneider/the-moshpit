import React from "react";
import { Link } from "react-router-dom";
import { Sign, User, Logout, Login } from "grommet-icons";

export const Navbar = React.memo((props: any) => {
  console.log("Navar Props.user :::::::::");
  console.log(props.user);

  return (
    <nav className="z-20 flex items-center justify-between flex-wrap bg-gray-900 border-solid border-b-2 border-gray-700 pl-6 pr-6 pt-3 pb-3 shadow-xl inset-x-0 top-0 object-top sticky">
      <div className="flex">
        <div className="my-auto pr-1">
          <ul className="flex text-white">
            <li>
              <Link to="/" className="mr-2">
                The Moshpit 🤘🏻
              </Link>
            </li>

            <div className="absolute right-0 flex pr-6">
              {props.user ? (
                <>
                  <div>
                    <li>
                      <Link to="/upvoted" className="mr-6">
                        <Sign color="gray" />
                      </Link>
                    </li>
                  </div>
                  <div>
                    <li>
                      <Link to="/profile" className="mr-6">
                        <User color="gray" />
                      </Link>
                    </li>
                  </div>
                  <div>
                    <li>
                      <a
                        href="http://localhost:5000/auth/logout"
                        className="mr-2"
                      >
                        <Logout color="gray" />
                      </a>
                    </li>
                  </div>
                </>
              ) : (
                <li>
                  <Link to="/login" className="mr-2">
                    <Login color="gray" />
                  </Link>
                </li>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
});
