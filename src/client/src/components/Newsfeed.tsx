import React, { useState, useRef, useCallback } from "react";
import usePostFetch from "../hooks/usePostFetch";
import { Post } from "./Post";

export const Newsfeed = () => {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const { loading, error, posts, hasMore } = usePostFetch(query, pageNumber);

  const observer: any = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer && observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("Visible ");
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
      console.log(node);
    },
    [loading, hasMore]
  );

  return (
    <div>
      {posts.map((post, index) => {
        if (posts.length === index + 1) {
          return (
            <div ref={lastPostElementRef} key={post.id}>
              {post.title}
            </div>
          );
        }
        return <Post key={post.id} name={post.title} />;
      })}
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </div>
  );
};
