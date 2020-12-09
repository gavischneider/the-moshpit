import React from "react";

export const Post = (props: any) => {
  return (
    <div className="rounded shadow-lg transform transition duration-300 hover:scale-110 bg-gray-700 mx-auto">
      <div className="">
        <a href={props.url} target="_blank" rel="noreferrer">
          <img alt={"Post header"} src={props.image} />
        </a>
        <h1 className="text-white my-2">{props.title}</h1>
      </div>
    </div>
  );
};
