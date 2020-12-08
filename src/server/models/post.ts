var feed = require("rss-to-json");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const mongoose = require("mongoose");

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
});

const postModel = (module.exports = mongoose.model("post", postSchema));

export interface Post {
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

// Recieves a URL and gets the RSS feed
module.exports.getPostsFromUrl = async (url: string, callback: Function) => {
  var rss = await feed.load(url);
  if (rss) {
    console.log(rss.items[0]);
    console.log(new Date(rss.items[0].created));
    callback(null, rss);
  } else {
    console.log("There was an error retrieving the rss feed");
  }
};

// Extracts the image source from 'description', which is HTML
module.exports.getImgFromHTML = (description: string): string | null => {
  const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
  const div: HTMLElement = dom.window.document.createElement("div");
  div.innerHTML = description;
  const image: HTMLElement = div.getElementsByTagName("img")[0];
  const imageSrc: string | null = image ? image.getAttribute("src") : "";
  console.log("OOOOOOOOOO Image source is: " + imageSrc);
  return imageSrc;
};

module.exports.getPost = (callback: Function) => {
  postModel.find((err: Error, data: any) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, data);
    }
  });
};

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
  });
  post.save(callback);
};
