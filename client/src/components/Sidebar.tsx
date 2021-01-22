import React from "react";
import { Source } from "./Source";
import "../sidebar.css";
//import { feeds } from "../constants/feeds";
import { useSelector } from "react-redux";
import { InitialState } from "../store/reducers/rootReducer";
import { Publisher } from "../../../shared/Publisher";

export const Sidebar = (props: any) => {
  const feeds = props.allFeeds;

  const publisherState = useSelector((state: InitialState) => {
    return state.publishers;
  });

  const { publishers } = publisherState;

  function compare(a: Publisher, b: Publisher) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  feeds.sort(compare);

  // Get all the names of the users subscribed publishers
  let length = 0;
  const publisherNames = [];
  publishers?.sort(compare);
  if (publishers !== undefined) {
    for (let i = 0; i < publishers.length; i++) {
      publisherNames.push(publishers[i].name);
      length++;
    }
  }

  // Get the publishers that the user is NOT subscribed to
  let nonSubscribed = [];
  for (let i = 0; i < feeds.length; i++) {
    if (!publisherNames?.includes(feeds[i].name)) {
      nonSubscribed.push(feeds[i]);
    }
  }

  return (
    <div>
      <nav className="navbar z-10 mt-11 pb-7">
        <ul className="navbar-nav shadow-xl border-r border-black">
          <li className="logo top-0 sticky z-20">
            <a href="#" className="nav-link">
              <span className="link-text logo-text">Sources</span>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fad"
                data-icon="angle-double-right"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
              >
                <g className="fa-group">
                  <path
                    fill="currentColor"
                    d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
                    className="fa-secondary"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
                    className="fa-primary"
                  ></path>
                </g>
              </svg>
            </a>
          </li>

          {publishers !== undefined
            ? publishers.map((feed: any) => {
                return <Source key={feed.url} feed={feed} sub={true} />;
              })
            : null}

          {nonSubscribed !== undefined &&
            nonSubscribed.map((feed: any) => {
              return <Source key={feed.url} feed={feed} sub={false} />;
            })}
        </ul>
      </nav>
    </div>
  );
};
