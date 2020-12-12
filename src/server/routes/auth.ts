export {};

const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const passport = require("passport");

router.get("/login", authController.login);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get("/google/redirect", authController.googleRedirect);

router.get("/logout", authController.logout);

module.exports = router;
