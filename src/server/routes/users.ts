export {};

const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/add", userController.addUser);

router.put("/removepublisher", userController.removePublisher);

module.exports = router;
