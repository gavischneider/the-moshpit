export {};

const path = require("path");
const passport = require("passport");

const authController = {
  login(req: any, res: any) {
    res.send("Login!");
  },
  // google(req: any, res: any) {
  //   passport.authenticate("google", {
  //     scope: ["profile"],
  //   });
  //   //res.send("Google");
  // },
  googleRedirect(req: any, res: any) {
    //res.send(req.user);
    if (!req.user) {
      // If user is not logged in
      res.redirect("/auth/login");
    } else {
      res.redirect("http://localhost:3000/profile");
    }
  },
  getUser(req: any, res: any) {
    if (req.user) {
      res.json(req.user);
    }
  },

  logout(req: any, res: any) {
    req.logout();
    res.redirect("http://localhost:3000/");
  },
};

module.exports = authController;
