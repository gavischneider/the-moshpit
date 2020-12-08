import { useEffect, useState } from "react";
import axios from "axios";

// Change the string to type post
export default function usePostFetch(query: any, pageNumber: number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState(Array<string>());
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setPosts(Array());
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    axios({
      method: "GET",
      url: "BACKEND API",
      params: { query: query, page: pageNumber },
    })
      .then((res) => {
        console.log(res.data);
        setPosts((prevPosts) => {
          return [...new Set([...prevPosts, ...res.data.posts])];
        });
        setHasMore(res.data.posts.length > 0);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
      });
  }, [query, pageNumber]);
  return { loading, error, posts, hasMore };
}
