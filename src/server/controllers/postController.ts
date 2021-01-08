import express from "express";
import { Post } from "../../shared/Post";
var feed = require("rss-to-json");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const mongoose = require("mongoose");
import { feeds } from "../constants/feeds";

import { Publisher } from "../../shared/Publisher";
import { Tag } from "../../shared/Tag";
import { Mongoose } from "mongoose";

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
        upvotes: req.body.upvotes,
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
    let sources;
    if (req.user) {
      sources = req.user.sources;
    } else {
      sources = feeds;
    }

    console.log("-----------------------------------------------");
    console.log("@@ Sources: @@");
    console.log(sources);
    console.log("-----------------------------------------------");

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
      .sort({ created: "desc" })
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

  getLikedPosts(req: any, res: any) {
    let userId = req.user._id.toString();
    console.log("USER ID");
    console.log(userId);
    console.log(typeof userId);

    const page = parseInt(req.query.page);
    const limit = 10;
    const startIndex = (page - 1) * limit;

    const query = postModel
      .find({
        upvotes: { $all: [userId] },
      })
      .sort({ created: "desc" })
      .limit(10)
      .skip(startIndex);
    query.exec((err: Error, posts: Post[]) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        console.log("LIKED POSTS");
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
    const postId: string = req.query.postId;
    const userId: string = req.query.userId;

    console.log("-=-=- req.query,postId -=-=-");
    console.log(req.query.postId);

    postModel.findOne({ _id: postId }).exec((err: Error, result: any) => {
      if (result) {
        console.log("result.upvotes");
        console.log(result.upvotes);
        console.log(typeof result.upvotes);
        if (result.upvotes !== undefined) {
          result.upvotes.push(userId);
        } else {
          result.upvotes = [userId];
        }

        console.log("RESULT BEFORE SAVE");
        console.log(result);
        result.save((err: Error) => {
          if (err) {
            console.log(`Error saving upvoted post: ${err}`);
          } else {
            console.log("Upvote stored successfully!");
          }
        });
      } else {
        console.log("Could not find the correct post to upvote");
      }
    });
  },

  downvotePost(req: any, res: any) {
    const postId = req.query.postId;
    const userId = req.query.userId;

    postModel.findOne({ _id: postId }).exec((err: Error, result: any) => {
      if (result) {
        console.log("userId: ");
        console.log(userId);
        console.log(typeof userId);
        console.log("-----");
        console.log(typeof result.upvotes[0]);

        console.log("Result before filter: ");
        console.log(result);
        let newResult = result;
        newResult.upvotes = result.upvotes.filter(
          (upvoterId: string) => userId.localeCompare(upvoterId) !== 0
        );
        console.log("newResult AFTER filter: ");
        console.log(newResult);
        newResult.save((err: Error) => {
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

// userId.localeCompare(upvoterId) !== 0
