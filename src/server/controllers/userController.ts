export {};

const userModel = require("../models/user");

const userController = {
  // userHome(req: any, res: any) {
  //   userModel.getUser((err: Error, data: any) => {
  //     try {
  //       if (err) {
  //         console.log(err);
  //       } else if (data) {
  //         res.render("home", { data: data });
  //       } else {
  //         res.render("home", { data: {} });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
  // },
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
