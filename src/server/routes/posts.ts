export {};

const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.post("/add", postController.addPost);

router.get("/getposts", postController.getPosts);

router.post("/upvotepost", postController.upvotePost);

router.post("/downvotepost", postController.downvotePost);

module.exports = router;
