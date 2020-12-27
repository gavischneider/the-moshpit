import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { feeds } from "../constants/feeds";
import { InitialState } from "../store/reducers/rootReducer";

// Change feeds to the feeds loaded into state
export const Publisher = (props: any) => {
  const userState = useSelector((state: InitialState) => {
    console.log("STATEEEEEE");
    console.log(state.auth);
    return state.auth;
  });

  const { user, authenticated } = userState;
  let imagePath = "";
  useEffect(() => {
    user && user.user.sources.map((source: any) => {});
  }, [imagePath, user]);

  //user.user.sources

  console.log(`ImagePath: ${imagePath}`);
  return (
    <div>
      <img src={imagePath} alt="publisher" />
    </div>
  );
};
