var feed = require("rss-to-json");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const mongoose = require("mongoose");

const feedSchema = new mongoose.Schema({
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
});

const feedModel = (module.exports = mongoose.model("feed", feedSchema));

export interface Feed {
  title: string;
  id: string;
  description: string;
  url: string;
  created: string;
  author: string;
  category: string[];
}

// Recieves a URL and gets the RSS feed
module.exports.getFeeds = async (feed: any, callback: Function) => {
  var rss = await feed.load(" http://feeds.feedburner.com/Metalsucks");
  if (rss) {
    console.log(rss.items[0]);
    console.log(new Date(rss.items[0].created));
    callback(null, rss);
  } else {
    console.log("There was an error retrieving the rss feed");
  }
};

// Extracts the image source from 'description', which is HTML
module.exports.getImgfromHTML = (description: string): string | null => {
  const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
  const div: HTMLElement = dom.window.document.createElement("div");
  div.innerHTML = description;
  const image: HTMLElement = div.getElementsByTagName("img")[0];
  const imageSrc: string | null = image ? image.getAttribute("src") : "";
  return imageSrc;
};

// Adds feed to the database
module.exports.addFeed = (newFeed: Feed, callback: Function) => {
  const feed = new feedModel({
    title: newFeed.title,
    id: newFeed.id,
    description: newFeed.description,
    url: newFeed.url,
    created: newFeed.created,
    author: newFeed.author,
    category: newFeed.category,
  });
  feed.save(callback);
};
