import express from "express";
import { Post } from "../../shared/Post";
var feed = require("rss-to-json");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const mongoose = require("mongoose");
import { feeds } from "../constants/feeds";

import { Publisher } from "../../shared/Publisher";

const postModel = require("../models/post");

const postController = {
  addPost(req: any, res: any) {
    try {
      console.log("addpost", req.body);
      const newPost = new postModel({
        title: req.body.title,
        id: req.bosy.id,
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
          res.redirect("/user/home");
        }
      });

      // newPost.save((err: Error, data: any) => {
      //   if (err) {
      //     console.log("error occured", err);
      //   } else {
      //     console.log(data);
      //     res.redirect("/user/home");
      //   }
      // });
    } catch (error) {
      console.log("error", error);
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
};

module.exports = postController;
