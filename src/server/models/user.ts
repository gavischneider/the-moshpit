const mongoose = require("mongoose");
import { User } from "../../shared/User";

const userSchema = new mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  userName: String,
  email: String,
  country: String,
});

const userModel = (module.exports = mongoose.model("user", userSchema));

module.exports.getUser = (callback: Function) => {
  userModel.find((err: Error, data: any) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, data);
    }
  });
};

module.exports.addUser = (newUser: any, callback: Function) => {
  const user = new userModel({
    firstname: newUser.firstName,
    lastname: newUser.lastName,
    email: newUser.city,
    country: newUser.country,
  });
  user.save(callback);
};
