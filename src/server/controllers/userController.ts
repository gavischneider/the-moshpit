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
    } catch (error) {
      console.log("error", error);
    }
  },

  // Remove a feed from the users sources list
  removePublisher(req: any, res: any) {
    console.log("REQ.query");
    console.log(req.query);
    const publisher = req.query.publisher;
    const userId = req.query.userId;
    console.log(
      "In the removePublisher function, heres the publisher and userId: "
    );
    console.log(publisher);
    console.log(userId);

    userModel.update(
      { _id: userId },
      { $pull: { sources: { name: publisher } } },
      function (err: Error, status: any) {
        if (err) {
          console.log(`Error removing source in db: ${err}`);
        } else {
          console.log(`Source removed from users list, ${status}`);
          console.log(status);
          res.send(status);
        }
      }
    );
  },
};

module.exports = userController;
