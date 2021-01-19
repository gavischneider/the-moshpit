export {};

const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.get("/getposts", postController.getPosts);

router.get("/getlikedposts", postController.getLikedPosts);

router.post("/upvotepost", postController.upvotePost);

router.post("/downvotepost", postController.downvotePost);

module.exports = router;
