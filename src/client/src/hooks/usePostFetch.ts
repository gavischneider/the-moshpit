import { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "../../../shared/Post";

// Change the string to type post
export default function usePostFetch(pageNumber: number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState(Array<Post>());
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setPosts([]);
  }, []);

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
  }, [pageNumber]);
  return { loading, error, posts, hasMore };
}
