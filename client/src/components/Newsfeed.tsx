import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useContext,
} from "react";
import usePostFetch from "../hooks/usePostFetch";
import { Post } from "./Post";
import { Tag } from "./Tag";
import { Upvote } from "./Upvote";
import { getDate } from "../services/getDate";
import { useSelector } from "react-redux";
import { InitialState } from "../store/reducers/rootReducer";
import { PublisherContext } from "../pages/Home";

export const Newsfeed = (props: any) => {
  const publisherContext = useContext(PublisherContext);
  console.log(
    "--------------------------------NEWSFEED RERENDERED! ---------------------"
  );

  const { user } = useSelector((state: InitialState) => {
    return state.auth;
  });

  const [pageNumber, setPageNumber] = useState(1);
  console.log(
    `-------Page Number: ${pageNumber} ---------------------------------++`
  );

  const { loading, error, posts, hasMore } = usePostFetch(
    pageNumber,
    publisherContext
  );

  const [pubs, setPubs] = useState(publisherContext);

  if (pubs.length !== publisherContext.length) {
    setPageNumber((prevPageNumber) => 1);
    setPubs(publisherContext);
  }

  const observer: any = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer && observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        console.log("<<<>>>>>>ENTRIES<<<>>>");
        console.log(entries);
        if (entries[0].isIntersecting && hasMore) {
          console.log(
            "|||||||||||||||||||||||||||||| Observer is Visible ||||||||||||||||||||||||||||||||||"
          );
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
      console.log(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="container mx-auto bg-gray-900 mt-5" id="newsfeed">
      <div className="object-center grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mx-auto pb-6 pt-6">
        {posts.map((post, index) => {
          if (posts.length === index + 1) {
            // Setting the des to 'observer' will make sure it does not get filtered out
            post.description = "observer";
            const date = getDate(post.created);
            return (
              <div
                key={`${post.id}00000`}
                ref={lastPostElementRef}
                className="rounded shadow-lg transform transition border border-transparent hover:border-white hover:border-opacity-50 bg-gray-700 mx-auto"
              >
                <div className="">
                  <a href={post.url} target="_blank" rel="noreferrer">
                    <img alt={"Post header"} src={post.image} />
                  </a>
                  <h1>{post.title}</h1>
                  <h3 className="text-white mb-2">{date}</h3>
                  <div className="px-6 py-4 mb-1">
                    {post.category.map((tag: string) => {
                      return <Tag key={tag} name={tag} />;
                    })}
                  </div>
                  <br />
                  <div className="absolute inset-x-0 bottom-0 bottom-2 m-2">
                    <Upvote postId={post.id} upvotes={post.upvotes} />
                  </div>
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
              postId={post._id}
              created={post.created}
              publisher={post.publisher}
              upvotes={post.upvotes}
              allFeeds={props.allFeeds}
            />
          );
        })}
      </div>
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </div>
  );
};
