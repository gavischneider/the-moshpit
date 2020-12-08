export {};

const userModel = require("../models/user");

const userController = {
  userHome(req: any, res: any) {
    userModel.getUser((err: Error, data: any) => {
      try {
        if (err) {
          console.log(err);
        } else if (data) {
          res.render("home", { data: data });
        } else {
          res.render("home", { data: {} });
        }
      } catch (error) {
        console.log(error);
      }
    });
  },
  addUser(req: any, res: any) {
    try {
      console.log("adduser", req.body);
      const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        state: req.body.state,
        country: req.body.country,
      };
      userModel.addUser(user, (err: Error, data: any) => {
        if (err) {
          console.log("error occured", err);
        } else {
          console.log(data);
          res.redirect("/user/home");
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  },
};

module.exports = userController;
