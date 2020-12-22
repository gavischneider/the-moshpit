export {};

const userModel = require("../models/user");

const userController = {
  addUser(req: any, res: any) {
    try {
      console.log("adduser", req.body);
      const newUser = new userModel({
        provider: req.body.provider,
        googleId: req.body.googleId,
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        photo: req.body.photo,
        joined: req.body.joined,
      });
      userModel.addUser(newUser, (err: Error, data: any) => {
        if (err) {
          console.log("An error occured", err);
        } else {
          console.log(data);
          res.redirect("/user/home");
        }
      });

      // newUser.save((err: Error, data: any) => {
      //   if (err) {
      //     console.log("An error occured", err);
      //   } else {
      //     console.log(data);
      //     res.redirect("/user/home");
      //   }
      // });
    } catch (error) {
      console.log("error", error);
    }
  },
};

module.exports = userController;
