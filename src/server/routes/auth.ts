const express = require("express");

const router = express.Router();

const authControler = require("../controllers/authController");

router.get("/login", authController.login);
