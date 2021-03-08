import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { InitialState } from "../store/reducers/rootReducer";
import { Post as PostT } from "../../../shared/Post";
import { Post } from "../components/Post";
import { setUser } from "../store/actions/authActions";

export const Profile = () => {
  const dispatch = useDispatch();

  const userState = useSelector((state: InitialState) => {
    return state.auth;
  });

  const { user, authenticated } = userState;

  useEffect(() => {
    // Check if there's a user but we dont yet have it
    if (userState && user === undefined) {
      dispatch(setUser());
    }
  }, [user, authenticated]);

  //if (!authenticated) return <Redirect to="/login" />;

  return (
    <div className="bg-gray-900">
      <Navbar user={authenticated} />
      <div className="flex justify-center min-h-screen shadow-xl">
        <div className="bg-gray-700 p-5 border border-black sm:w-screen md:w-4/5 lg:w-3/5 xl:w-2/5 ">
          {user && (
            <div className="flex justify-evenly ">
              <div className="border border-black">
                <img
                  src={user.user.photo}
                  alt={"profile"}
                  className="rounded-full h-36 w-36"
                />
              </div>
              <div className="border border-black">
                <h2>{user.user.username}</h2>
                <h2>{user.user.email}</h2>
                <h2>{`Login Method: ${
                  user.user.provider[0].toUpperCase() +
                  user.user.provider.slice(1)
                }`}</h2>
                <h2>{`You joined on: ${user.user.joined}`}</h2>

                {/* Need to better sync the users subscription numbers - publisher state gets updated 
                but user state does not - until the page is refreshed */}
                <h2>{`You're currently subscribed to ${user.user.sources.length} feeds`}</h2>
              </div>
            </div>
          )}
          <div className="flex justify-center pt-10">
            {!user && (
              <p className="text-2xl text-white">
                Please login to view your profile
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
