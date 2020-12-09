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
    <div className="container mx-auto bg-gray-900">
      <div className="object-center grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mx-auto">
        {posts.map((post, index) => {
          if (posts.length === index + 1) {
            return (
              <div
                ref={lastPostElementRef}
                className="rounded shadow-lg transform transition duration-300 hover:scale-110 bg-gray-800 mx-auto"
              >
                <div className="">
                  <a href={post.url} target="_blank" rel="noreferrer">
                    <img alt={"Post header"} src={post.image} />
                  </a>
                  <h1>{post.title}</h1>
                </div>
              </div>
            );
          }
          return (
            <Post
              key={post.id}
              title={post.title}
              url={post.url}
              image={post.image}
              category={post.category}
            />
          );
        })}
      </div>
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </div>
  );
};
