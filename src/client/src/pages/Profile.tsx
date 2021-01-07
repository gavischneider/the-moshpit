import React from "react";
import { Navbar } from "../components/Navbar";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { InitialState } from "../store/reducers/rootReducer";

export const Profile = () => {
  const dispatch = useDispatch();

  const userState = useSelector((state: InitialState) => {
    console.log("STATEEEEEE");
    console.log(state.auth);
    return state.auth;
  });

  const { user, authenticated } = userState;

  const publisherState = useSelector((state: InitialState) => {
    return state.publishers;
  });

  const { publishers, loadedUsersFeeds } = publisherState;

  // useEffect(() => {
  //   // Check if there's a user authenticated but we dont yet have it
  //   if (typeof userState.user === "undefined") {
  //     // && userState.authenticated
  //     console.log("IM IN THE IF");
  //     dispatch(setUser());
  //   }
  // });

  if (!authenticated) return <Redirect to="/login" />;

  return (
    <div>
      <Navbar user={userState} />
      <div className="flex justify-center">
        <div className="bg-gray-700 p-5 border border-black w-3/5">
          {user && (
            <div className="flex justify-evenly">
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

                <h2>{user.user.joined}</h2>
              </div>
            </div>
          )}
          <div className="flex justify-center">
            <h2>Your News Sources</h2>
            <ul>
              {user &&
                user.user.sources.map((source: any) => {
                  return (
                    <div>
                      <li key={source.url}>{source.name}</li>
                      <img
                        src={source.image}
                        alt={"source"}
                        className="svg-inline--fa fa-w-20 fa-5x"
                      />
                    </div>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
