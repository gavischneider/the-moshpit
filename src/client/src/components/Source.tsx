import React, { useRef } from "react";
import "../sidebar.css";
import { CgRemove } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { InitialState } from "../store/reducers/rootReducer";
import { removeFeed } from "../store/actions/publisherActions";

export const Source = (props: any) => {
  const dispatch = useDispatch();
  const userState = useSelector((state: InitialState) => {
    return state.auth;
  });
  const { user, authenticated } = userState;

  const publisherState = useSelector((state: InitialState) => {
    return state.publishers;
  });

  const { publishers } = publisherState;

  const feedNameRef = useRef<any>(null);

  const handleClick = (e: any) => {
    if (user !== undefined && authenticated) {
      // 1. Remove feed from sidebar
      // 2. remove feed from users sources (in db)
      console.log("------ ref ------");
      console.log(feedNameRef.current.innerText);
      dispatch(
        removeFeed(publishers, feedNameRef.current.innerText, user.user._id)
      );
    } else {
      // User is not logged in, can't remove feeds
    }
  };

  return (
    <li className="nav-item">
      <a href="#" className="nav-link">
        <div className="">
          <img
            src={props.feed.image}
            alt={"source"}
            className="svg-inline--fa fa-w-20 fa-5x"
          />
        </div>

        <span className="link-text" ref={feedNameRef}>
          {props.feed.name}
        </span>
        <CgRemove
          className=" remove-button transform transition duration-300 hover:scale-125"
          size="1.5em"
          onClick={handleClick}
        />
      </a>
    </li>
  );
};
