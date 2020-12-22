export {};

const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.post("/add", postController.addPost);

router.get("/getposts", postController.getPosts);

router.get("./upvotepost", postController.upvotePost);

router.get("./downvotepost", postController.downvotePost);

module.exports = router;
