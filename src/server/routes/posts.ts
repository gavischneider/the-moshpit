const express = require("express");
const postControler = require("../controllers/postController");

const router = express.Router();

router.get("/getposts", postControler.getPosts);

router.get("/post", postControler.searchPost);

router.post("/add", postControler.addPost);

module.exports = router;
