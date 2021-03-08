import React, { useRef } from "react";
import "../sidebar.scss";
import { CgRemove, CgAdd } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { InitialState } from "../store/reducers/rootReducer";
import { removeFeed, addFeed } from "../store/actions/publisherActions";
//import { feeds } from "../constants/feeds";

export const Source = (props: any) => {
  const feeds = props.allFeeds;

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

  const handleClickRemove = (e: any) => {
    if (user !== undefined && authenticated) {
      dispatch(
        removeFeed(publishers, feedNameRef.current.innerText, user.user._id)
      );
    } else {
      // User is not logged in, can't remove feeds
      console.log("Cant remove feed");
    }
  };

  const handleClickAdd = (e: any) => {
    if (user !== undefined && authenticated) {
      let feed = feeds.filter((feed: any) => {
        return feed.name.localeCompare(feedNameRef.current.innerText) === 0;
      });
      dispatch(addFeed(publishers, feed[0], user.user._id));
    } else {
      // User is not logged in, can't add feeds
      console.log("Cant add feed");
    }
  };

  return (
    <li className="nav-item">
      <a className={"nav-link " + (authenticated ? "" : "inactiveLink")}>
        <div className="">
          <img
            src={props.feed.image}
            alt={"source"}
            className="svg-inline--fa fa-w-20 fa-5x rounded"
          />
        </div>
        <span className="link-text" ref={feedNameRef}>
          {props.feed.name}
        </span>

        {props.sub ? (
          <CgRemove
            className="remove-button transform transition duration-300 hover:scale-125"
            size="1.5em"
            onClick={handleClickRemove}
          />
        ) : (
          <CgAdd
            className="add-button transform transition duration-300 hover:scale-125"
            size="1.5em"
            onClick={handleClickAdd}
          />
        )}
      </a>
    </li>
  );
};
