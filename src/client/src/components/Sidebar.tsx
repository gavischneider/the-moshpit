import React from "react";

export const Sidebar = () => {
  return (
    <div className="menu z-10">
      <link rel="stylesheet" type="text/css" href="../App.css"></link>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css"
      ></link>

      <nav className="main-menu z-10">
        <div className="logo"></div>
        <div className="settings"></div>
        <ul>
          <li>
            {" "}
            <a href="http://startific.com">
              <i className="fa fa-home fa-lg"></i>
              <span className="nav-text">Home</span>
            </a>
          </li>
          <li className="has-subnav">
            {" "}
            <a href="#">
              <i className="fa fa-clock-o fa-lg"></i>
              <span className="nav-text">News</span>
            </a>
          </li>
          <li>
            {" "}
            <a href="#">
              <i className="fa fa-desktop fa-lg"></i>
              <span className="nav-text">Technology</span>
            </a>
          </li>
          <li className="has-subnav">
            {" "}
            <a href="#">
              <i className="fa fa-plane fa-lg"></i>
              <span className="nav-text">Travel</span>
            </a>
          </li>
          <li>
            {" "}
            <a href="#">
              <i className="fa fa-shopping-cart"></i>
              <span className="nav-text">Shopping</span>
            </a>
          </li>
          <li>
            {" "}
            <a href="#">
              <i className="fa fa-microphone fa-lg"></i>
              <span className="nav-text">Film & Music</span>
            </a>
          </li>
          <li>
            {" "}
            <a href="#">
              <i className="fa fa-flask fa-lg"></i>
              <span className="nav-text">Web Tools</span>
            </a>
          </li>
          <li>
            {" "}
            <a href="#">
              <i className="fa fa-picture-o fa-lg"></i>
              <span className="nav-text">Art & Design</span>
            </a>
          </li>
          <li>
            {" "}
            <a href="#">
              <i className="fa fa-align-left fa-lg"></i>
              <span className="nav-text">Magazines</span>
            </a>
          </li>
          <li>
            {" "}
            <a href="#">
              <i className="fa fa-gamepad fa-lg"></i>
              <span className="nav-text">Games</span>
            </a>
          </li>
          <li>
            {" "}
            <a href="#">
              <i className="fa fa-glass fa-lg"></i>
              <span className="nav-text">Life & Style</span>
            </a>
          </li>
          <li className="has-subnav">
            {" "}
            <a href="#">
              <i className="fa fa-rocket fa-lg"></i>
              <span className="nav-text">Fun</span>
            </a>
          </li>
        </ul>
        <ul className="logout">
          <li>
            {" "}
            <a href="#">
              <i className="fa fa-lightbulb-o fa-lg"></i>
              <span className="nav-text">BLOG</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
