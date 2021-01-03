import React, { useEffect, useState, useRef } from "react";
import { GrSign } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { downvotePost, upvotePost } from "../store/actions/postActions";
import { InitialState } from "../store/reducers/rootReducer";

export const Upvote = (props: any) => {
  //console.log("UPVOTE COMPONENT PROPS");
  //console.log(props);

  const dispatch = useDispatch();
  const userState = useSelector((state: InitialState) => {
    return state.auth;
  });
  const { user, authenticated } = userState;

  const [upvoted, setUpvoted] = useState(false);
  const iconRef = useRef<any>(null);

  useEffect(() => {
    // If user already upvoted post, make color red
    if (userState && userState.user !== undefined) {
      const userId = userState.user.user._id;

      console.log("props.upvotes.indexOf(userId)");
      props.upvotes && console.log(props.upvotes.indexOf(userId));

      console.log("props.upvotes");
      console.log(props.upvotes);

      console.log("userId");
      console.log(userId);

      if (props.upvotes && props.upvotes.indexOf(userId) > -1) {
        // The user already upvoted this post
        setUpvoted(true);
      }
    }
  }, [userState, upvoted]);

  useEffect(() => {
    if (upvoted) {
      iconRef.current.querySelector("svg path").setAttribute("fill", "red");
    }
  }, [upvoted]);

  const handleClick = (e: any) => {
    if (user !== undefined) {
      const userId = user.user._id;
      if (!upvoted) {
        console.log("UPVOTE");
        console.log(e.currentTarget);
        e.currentTarget.querySelector("path").setAttribute("fill", "red");
        setUpvoted(true);
        dispatch(upvotePost(props.postId, userId));
      } else {
        console.log("DOWNVOTE");
        console.log(e.currentTarget);
        e.currentTarget.querySelector("path").setAttribute("fill", "none");
        setUpvoted(false);
        dispatch(downvotePost(props.postId, userId));
      }
    } else {
      // User is not logged in, cannot perform up/down vote
    }
  };

  return (
    <div className="flex items-center" ref={iconRef}>
      <GrSign
        size="2em"
        className="transform transition duration-300 hover:scale-125"
        onClick={handleClick}
      />
      {/* change inner text to props.upvotes.length */}
      <div className="pl-2 text-lg">{props.upvotes ? props.upvotes : 0}</div>
    </div>
  );
};
