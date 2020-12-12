import express from "express";
import { Post } from "../../shared/Post";

const postModel = require("../models/post");

const postController = {
  addPost(req: any, res: any) {
    try {
      console.log("addpost", req.body);
      const post = {
        title: req.body.title,
        id: req.bosy.id,
        description: req.body.description,
        url: req.body.url,
        created: req.body.url,
        author: req.body.author,
        category: req.body.category,
        image: req.body.image,
      };
      postModel.addPost(post, (err: Error, data: any) => {
        if (err) {
          console.log("error occured", err);
        } else {
          console.log(data);
          res.redirect("/user/home");
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  },
  // Need to update with the query
  getPosts(req: any, res: any) {
    //const query = req.query.query;
    const page = parseInt(req.query.page);
    const limit = 10;
    const startIndex = (page - 1) * limit;
    //const endIndex = page * limit;

    // postModel.find({}, function (err: Error, posts: any) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(posts);
    //     res.send(posts);
    //   }
    // });

    const query = postModel.find().limit(limit).skip(startIndex);
    query.exec((err: Error, posts: Post[]) => {
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
