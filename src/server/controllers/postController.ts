import express from "express";
import { Post } from "../../shared/Post";
var feed = require("rss-to-json");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const mongoose = require("mongoose");
import { feeds } from "../constants/feeds";

import { Publisher } from "../../shared/Publisher";
import { Tag } from "../../shared/Tag";

const postModel = require("../models/post");
const tagController = require("./tagController");

const postController = {
  addPost(req: any, res: any) {
    try {
      console.log("addpost", req.body);
      const newPost = new postModel({
        title: req.body.title,
        id: req.body.id,
        description: req.body.description,
        url: req.body.url,
        created: req.body.url,
        author: req.body.author,
        category: req.body.category,
        image: req.body.image,
        publisher: req.body.publisher,
      });
      postModel.addPost(newPost, (err: Error, data: any) => {
        if (err) {
          console.log("error occured", err);
        } else {
          console.log(data);
          //res.redirect("/user/home");
        }
      });
    } catch (error) {
      console.log("Error adding new post (and its tags)", error);
    }
  },

  // Need to update with the query
  getPosts(req: any, res: any) {
    // console.log("-----------------------------------------------");
    // console.log("@@ Sources: @@");
    // console.log("-----------------------------------------------");
    // console.log(req.query.query);
    let sources;
    if (req.user) {
      sources = req.user.sources;
    } else {
      sources = feeds;
    }

    let sourceNames = [];
    for (let i = 0; i < sources.length; i++) {
      sourceNames[i] = sources[i].name;
    } // JSON.parse

    const page = parseInt(req.query.page);
    const limit = 10;
    const startIndex = (page - 1) * limit;
    //const endIndex = page * limit;

    // --TODO--
    // Change to query2 after 'publisher' is add to each post
    const query = postModel.find().limit(limit).skip(startIndex);
    const query2 = postModel
      .find({ publisher: { $in: sourceNames } })
      .limit(limit)
      .skip(startIndex);
    query2.exec((err: Error, posts: Post[]) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        console.log(posts);
        res.send(posts);
      }
    });
  },

  // Recieves a URL and gets the RSS feed
  async getPostsFromUrl(url: string, callback: Function) {
    var rss = await feed.load(url);
    if (rss) {
      console.log(rss.items[0]);
      console.log(new Date(rss.items[0].created));
      callback(null, rss);
    } else {
      console.log("There was an error retrieving the rss feed");
    }
  },

  // Extracts the image source from 'description', which is HTML
  getImgFromHTML(description: string): string | null {
    const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
    const div: HTMLElement = dom.window.document.createElement("div");
    div.innerHTML = description;
    const image: HTMLElement = div.getElementsByTagName("img")[0];
    const imageSrc: string | null = image ? image.getAttribute("src") : "";
    console.log("OOOOOOOOOO Image source is: " + imageSrc);
    return imageSrc;
  },

  upvotePost(req: any, res: any) {
    const postId: string = req.body.postId;
    const userId: string = req.body.userId;

    postModel.findOne({ _id: postId }).exec((err: Error, result: any) => {
      if (result) {
        result.upvotes.push(userId);
        result.save((err: Error) => {
          if (err) {
            console.log(`Error saving upvoted post: ${err}`);
          }
        });
      } else {
        console.log("Could not find the correct post to upvote");
      }
    });
  },

  downvotePost(req: any, res: any) {
    const postId = req.body.postId;
    const userId = req.body.userId;

    postModel.findOne({ _id: postId }).exec((err: Error, result: any) => {
      if (result) {
        result.upvotes.filter((upvoterId: string) => userId !== upvoterId);
        result.save((err: Error) => {
          if (err) {
            console.log(`Error saving downvoted post: ${err}`);
          }
        });
      } else {
        console.log("Could not find the correct post to upvote");
      }
    });
  },
};

module.exports = postController;
