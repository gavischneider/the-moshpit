export {};

const path = require("path");
const passport = require("passport");

const authController = {
  login(req: any, res: any) {
    res.send("Login!");
  },

  loginSuccess(req: any, res: any) {
    console.log("IM IN THE LOGIN SUCCESS FUNCTION< HERES THE USER: ");
    console.log(req.user);
    if (req.user) {
      res.json({
        success: true,
        message: "User has successfully authenticated",
        user: req.user,
        cookies: req.cookies,
      });
    }
  },

  // When login fails, send message
  loginFailed(req: any, res: any) {
    res.status(401).json({
      success: false,
      message: "User failed to authenticate",
    });
  },

  // googleRedirect(req: any, res: any) {
  //   res.send(req.user);
  //   if (!req.user) {
  //     //If user is not logged in
  //     res.redirect("/auth/login");
  //   } else {
  //     res.redirect("http://localhost:3000/profile");
  //   }
  // },

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
