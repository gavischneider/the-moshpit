export {};

const express = require("express");
const publisherController = require("../controllers/publisherController");

const router = express.Router();

router.get("/getpublishers", publisherController.getPublishers);
