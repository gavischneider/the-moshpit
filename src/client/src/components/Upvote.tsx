import React, { useEffect, useState, useRef } from "react";
import { GrSign } from "react-icons/gr";
import { useSelector } from "react-redux";
import { InitialState } from "../store/reducers/rootReducer";
import "../upvote.css";

export const Upvote = (props: any) => {
  //console.log("this");
  //console.log(this);
  const userState = useSelector((state: InitialState) => {
    return state.auth;
  });

  const [upvoted, setUpvoted] = useState(false);
  const iconRef = useRef<any>(null);

  useEffect(() => {
    // If user already upvoted post, make color red
    if (userState && userState.user !== undefined) {
      const userId = userState.user.user._id;
      if (props.upvotes.indexOf(userId) > -1) {
        // The user already upvoted this post
        setUpvoted(true);
      }
    }
  }, []);

  useEffect(() => {
    if (upvoted) {
      iconRef.current.querySelector("svg path").setAttribute("fill", "red");
    }
  }, [upvoted]);

  const handleClick = (e: any) => {
    if (upvoted) {
      e.target.querySelector("path").setAttribute("fill", "red");
      setUpvoted(true);
      // Dispatch upvotePost
    } else {
      e.target.querySelector("path").setAttribute("fill", "none");
      setUpvoted(false);
      // Dispatch downvotePost
    }

    //this.querySelector("path").setAttribute("fill", "red");

    // Todo:
    // Check if user already liked post
    // --- If yes, toggle un-upvote
    // --- lower count
    // else
    // --- Toggle upvote
    // --- raise count
  };

  return (
    <div className="flex items-center" ref={iconRef}>
      <GrSign
        size="2em"
        className="transform transition duration-300 hover:scale-125"
        onClick={handleClick}
      />
      {/* change inner text to props.upvotes.length */}
      <div className="pl-2 text-lg">0</div>
    </div>
  );
};
