export {};

const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

//router.get("/getposts", postController.getPosts);

//router.get("/post", postController.searchPost);

router.post("/add", postController.addPost);

module.exports = router;
