export {};

const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const passport = require("passport");

router.get("/login", authController.login);

router.get("/login/success", authController.loginSuccess);

router.get("/login/failed", authController.loginFailed);

router.get("/user", authController.getUser);

router.get("/logout", (req: any, res: any) => {
  req.logout();
  res.redirect("http://localhost:3000/");
});

// Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "/auth/login/failed",
  })
);

// Facebook
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);

router.get(
  "/facebook/redirect",
  passport.authenticate("facebook", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "/auth/login/failed",
  })
);

module.exports = router;
