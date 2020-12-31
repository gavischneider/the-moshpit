export {};

const express = require("express");
const publisherController = require("../controllers/publisherController");

const router = express.Router();

//router.post("/add")

router.get("/getpublishers", publisherController.getPublishers);

router.put("/removepublisher", publisherController.removePublisher);

module.exports = router;
