const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  state: String,
  country: String,
});

const userModel = (module.exports = mongoose.model("user", userSchema));

module.exports.getUser = (callback) => {
  userModel.find((err: Error, data) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, data);
    }
  });
};

module.exports.addUser = (newUser, callback) => {
  const user = new userModel({
    firstname: newUser.firstname,
    lastname: newUser.lastname,
    email: newUser.city,
    state: newUser.state,
    country: newUser.country,
  });
  user.save(callback);
};
