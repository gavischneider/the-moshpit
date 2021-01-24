import express from "express";
import { Post } from "../../../shared/Post";
var feed = require("rss-to-json");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const mongoose = require("mongoose");
const app = require("../app");
//import { feeds } from "../constants/feeds";
const loadAllFeeds = require("../services/loadAllFeeds");
const fs = require("fs");

import { Publisher } from "../../../shared/Publisher";
import { Tag } from "../../../shared/Tag";
import { Mongoose } from "mongoose";

const postModel = require("../models/post");
const tagController = require("./tagController");

const postController = {
  async getPosts(req: any, res: any) {
    let sources;
    if (req.user) {
      sources = req.user.sources;

      let sourceNames = [];
      for (let i = 0; i < sources.length; i++) {
        sourceNames[i] = sources[i].name;
      }

      const page = parseInt(req.query.page);
      const limit = 10;
      const startIndex = (page - 1) * limit;
      //const endIndex = page * limit;

      const query = postModel
        .find({ publisher: { $in: sourceNames } })
        .sort({ created: "desc" })
        .limit(limit)
        .skip(startIndex);

      query.exec((err: Error, posts: Post[]) => {
        if (err) {
          res.status(500).json({ message: err.message });
        } else {
          //console.log(posts);
          res.send(posts);
        }
      });
    } else {
      // Ther's no user logged in, so we want to grab posts from ALL feeds/publishers
      //sources = feeds;
      loadAllFeeds((err: Error, data: any) => {
        if (err) {
          console.log(`Problem loading feeds: ${err}`);
        } else {
          console.log(data);
          sources = data;

          let sourceNames = [];
          for (let i = 0; i < sources.length; i++) {
            sourceNames[i] = sources[i].name;
          }

          const page = parseInt(req.query.page);
          const limit = 10;
          const startIndex = (page - 1) * limit;
          //const endIndex = page * limit;

          const query = postModel
            .find({ publisher: { $in: sourceNames } })
            .sort({ created: "desc" })
            .limit(limit)
            .skip(startIndex);

          query.exec((err: Error, posts: Post[]) => {
            if (err) {
              res.status(500).json({ message: err.message });
            } else {
              //console.log(posts);
              res.send(posts);
            }
          });
        }
      });
    }
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
        //console.log("LIKED POSTS");
        //console.log(posts);
        res.send(posts);
      }
    });
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
