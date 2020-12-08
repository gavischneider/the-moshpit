export {};

var userModel = require("../models/user");

var usersController = {
  userHome(req, res) {
    userModel.getUser((err, data) => {
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
  addUsers(req, res) {
    try {
      console.log("adduser", req.body);
      const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        state: req.body.state,
        country: req.body.country,
      };
      userModel.addUser(user, (err, data) => {
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

module.exports = usersController;
