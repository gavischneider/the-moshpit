import React from "react";
import "../sidebar.css";
import { CgRemove } from "react-icons/cg";

export const Source = (props: any) => {
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

        <span className="link-text">{props.feed.name}</span>
        <CgRemove className="remove-button" size="1.5em" />
      </a>
    </li>
  );
};
