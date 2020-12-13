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
    res.send("You reached the callback URI");
  },
  logout(req: any, res: any) {
    res.send("Logging out");
  },
};

module.exports = authController;
