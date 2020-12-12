import React from "react";
import "../sidebar.css";

export const Source = (props: any) => {
  return (
    <li className="nav-item">
      <a href="#" className="nav-link">
        <img
          src={props.feed.image}
          alt={"source"}
          className="svg-inline--fa fa-w-20 fa-5x"
        />

        <span className="link-text">{props.feed.name}</span>
      </a>
    </li>
  );
};
