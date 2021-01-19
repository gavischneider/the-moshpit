export {};

const express = require("express");
const tagController = require("../controllers/tagController");

const router = express.Router();

router.get("/gettags", tagController.getTags);

module.exports = router;
