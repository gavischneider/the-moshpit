import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { InitialState } from "../store/reducers/rootReducer";
import axios from "axios";
import { Post as PostT } from "../../../shared/Post";
import { Post } from "../components/Post";

export const Profile = () => {
  const dispatch = useDispatch();

  const userState = useSelector((state: InitialState) => {
    console.log("STATEEEEEE");
    console.log(state.auth);
    return state.auth;
  });

  const { user, authenticated } = userState;

  const publisherState = useSelector((state: InitialState) => {
    return state.publishers;
  });

  const { publishers, loadedUsersFeeds } = publisherState;

  const [likedPosts, setLikedPosts] = useState(Array<PostT>());

  // useEffect(() => {
  //   // Check if there's a user authenticated but we dont yet have it
  //   if (typeof userState.user === "undefined") {
  //     // && userState.authenticated
  //     console.log("IM IN THE IF");
  //     dispatch(setUser());
  //   }
  // });

  useEffect(() => {
    axios({
      method: "GET",
      url: "post/getlikedposts",
    }).then((res) => {
      setLikedPosts((prevPosts: any) => {
        console.log(res.data);
        const arr: PostT[] = [...prevPosts, ...res.data];
        const map: any = {};
        for (const post of arr) {
          map[post.id] = post;
        }
        const newArray: PostT[] = Object.values(map);
        return newArray;
      });
    });
  }, []);

  if (!authenticated) return <Redirect to="/login" />;

  return (
    <div>
      <Navbar user={userState} />
      <div className="flex justify-center">
        <div className="bg-gray-700 p-5 border border-black w-3/5">
          {user && (
            <div className="flex justify-evenly">
              <div className="border border-black">
                <img
                  src={user.user.photo}
                  alt={"profile"}
                  className="rounded-full h-36 w-36"
                />
              </div>
              <div className="border border-black">
                <h2>{user.user.username}</h2>
                <h2>{user.user.email}</h2>

                <h2>{user.user.joined}</h2>
              </div>
            </div>
          )}
          <div>Your Upvoted Posts</div>
          {likedPosts.map((post) => {
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
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
