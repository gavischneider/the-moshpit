var feed = require("rss-to-json");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const mongoose = require("mongoose");
import { Post } from "../../../shared/Post";

const postSchema = new mongoose.Schema({
  title: String,
  id: String,
  description: String,
  url: String,
  created: String,
  author: String,
  category: [
    {
      type: String,
    },
  ],
  image: String,
  publisher: String,
  upvotes: [
    {
      type: String,
    },
  ],
});

const postModel = (module.exports = mongoose.model("post", postSchema));

// Adds feed to the database
module.exports.addPost = (newPost: Post, callback: Function) => {
  const post = new postModel({
    title: newPost.title,
    id: newPost.id,
    description: newPost.description,
    url: newPost.url,
    created: newPost.created,
    author: newPost.author,
    category: newPost.category,
    image: newPost.image,
    publisher: newPost.publisher,
    upvotes: newPost.upvotes,
  });
  post.save(callback);
};
