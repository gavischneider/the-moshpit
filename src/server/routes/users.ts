const express = require("express");
const userControler = require("../controller/userController");

const router = express.Router();

router.get("/home", userControler.userHome);

router.post("/add", userControler.addUsers);

module.exports = router;
