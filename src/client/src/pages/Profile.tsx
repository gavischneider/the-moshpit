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
    <div className="bg-gray-300">
      <Navbar user={userState} />
      <h1>Profile!!!</h1>
      {user && (
        <div>
          <h2>{user.user.username}</h2>
          <h2>{user.user.email}</h2>
          <img src={user.user.photo} alt={"profile"} />
          <h2>{user.user.joined}</h2>
          <h2>Your News Sources</h2>
          <ul>
            {user.user.sources.map((source: any) => {
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
      )}
    </div>
  );
};
