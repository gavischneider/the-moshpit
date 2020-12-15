export {};

const express = require("express");
const userControler = require("../controllers/userController");

const router = express.Router();

router.post("/add", userControler.addUser);

module.exports = router;
