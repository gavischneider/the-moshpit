import { useEffect, useState } from "react";
import axios from "axios";

interface Post {
  title: string;
  id: string;
  description: string;
  url: string;
  created: string;
  author: string;
  category: string[];
  enclosures: object[];
  image: string;
}

// Change the string to type post
export default function usePostFetch(query: any, pageNumber: number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState(Array<Post>());
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setPosts(Array());
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    axios({
      method: "GET",
      url: "getposts",
      params: { query: query, page: pageNumber },
    })
      .then((res) => {
        console.log(res.data);
        setPosts((prevPosts: any) => {
          const arr: Post[] = [...prevPosts, ...res.data.posts];
          const map: any = {};
          for (const post of arr) {
            map[post.id] = post;
          }
          const newArray: Post[] = Object.values(map);
          return newArray;

          //return [...new Set([...prevPosts, ...res.data.posts])];
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
