import React from "react";
import { Tag } from "./Tag";
import { Upvote } from "./Upvote";

export const Post = (props: any) => {
  return (
    <div className="rounded shadow-lg transform transition duration-300 hover:scale-110 bg-gray-700 mx-auto">
      <div className="p-2">
        <a href={props.url} target="_blank" rel="noreferrer">
          <img alt={"Post header"} src={props.image} className="rounded" />
        </a>
        <h1 className="text-white my-2">{props.title}</h1>
        <div className="px-6 py-4">
          {props.category.map((tag: string) => {
            return <Tag key={tag} name={tag} />;
          })}
        </div>
        <Upvote postId={props.postId} upvotes={props.upvotes} />
      </div>
    </div>
  );
};
