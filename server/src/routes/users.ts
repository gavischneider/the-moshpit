export {};

const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

//router.post("/add", userController.addUser);

router.put("/removepublisher", userController.removePublisher);

router.put("/addpublisher", userController.addPublisher);

module.exports = router;
