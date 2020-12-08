const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  country: String,
});

const userModel = (module.exports = mongoose.model("user", userSchema));

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
}

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
