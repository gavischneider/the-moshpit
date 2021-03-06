import { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "../../../shared/Post";
import { useSelector } from "react-redux";
import { InitialState } from "../store/reducers/rootReducer";
import { Publisher } from "../../../shared/Publisher";

// Change the string to type post
export default function usePostFetch(
  pageNumber: number,
  publisherContext: any
) {
  console.log(`BACK IN USE_POST_FETCH, PAGE NUM: ${pageNumber}`);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState(Array<Post>());
  const [hasMore, setHasMore] = useState(false);

  // const { publishers } = useSelector((state: InitialState) => {
  //   return state.publishers;
  // });

  // const { user } = useSelector((state: InitialState) => {
  //   return state.auth;
  // });

  // Get all the names of the users subscribed publishers
  // let length = 0;
  // const publisherNames: string[] = [];
  // if (pubContext !== undefined) {
  //   for (let i = 0; i < pubContext.length; i++) {
  //     publisherNames.push(pubContext[i].name);
  //     length++;
  //   }
  // }

  // let newPosts = posts.filter((post) => {
  //   return publisherNames.includes(post.publisher);
  // });
  // setPosts(newPosts);

  useEffect(() => {
    setPosts([]);
    console.log("POSTS IS NOW EMPTY AGAIN");
  }, [publisherContext]);

  // useEffect(() => {
  //   pageNumber = 1;
  // }, [publisherContext]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    axios({
      method: "GET",
      url: "post/getposts",
      params: { page: pageNumber },
    })
      .then((res) => {
        console.log(res.data);
        setPosts((prevPosts: any) => {
          console.log(res.data);
          const arr: Post[] = [...prevPosts, ...res.data];
          const map: any = {};
          for (const post of arr) {
            map[post.id] = post;
          }
          const newArray: Post[] = Object.values(map);
          return newArray;

          //return [...new Set([...prevPosts, ...res.data.posts])];
        });
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
      });
  }, [pageNumber, publisherContext]);
  return { loading, error, posts, hasMore };
}
