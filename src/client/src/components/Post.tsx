import React from "react";
import { Tag } from "./Tag";
import { Upvote } from "./Upvote";
import { getDate } from "../services/getDate";

export const Post = (props: any) => {
  const date = getDate(props.created);
  return (
    <div className="rounded shadow-lg transform transition border border-transparent hover:border-white hover:border-opacity-50 bg-gray-700 mx-auto">
      <div className="p-2">
        <a href={props.url} target="_blank" rel="noreferrer">
          <img alt={"Post header"} src={props.image} className="rounded" />
        </a>
        <h1 className="text-white my-2">{props.title}</h1>
        <h3 className="text-white mb-2 opacity-75">{date}</h3>
        <div className="px-6 py-4 mb-1">
          {props.category.map((tag: string) => {
            return <Tag key={tag} name={tag} />;
          })}
        </div>
        <br />
        <div className="absolute absolute inset-x-0 bottom-0 bottom-2 m-2">
          <Upvote postId={props.postId} upvotes={props.upvotes} />
        </div>
      </div>
    </div>
  );
};
