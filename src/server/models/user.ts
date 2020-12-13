const mongoose = require("mongoose");
import { User } from "../../shared/User";

const userSchema = new mongoose.Schema({
  provider: String,
  googleId: String,
  firstname: String,
  lastname: String,
  username: String,
  email: String,
  photo: String,
});

const userModel = (module.exports = mongoose.model("user", userSchema));

// module.exports.getUser = (callback: Function) => {
//   userModel.find((err: Error, data: any) => {
//     if (err) {
//       console.log(err);
//     } else {
//       callback(null, data);
//     }
//   });
// };

module.exports.addUser = (newUser: any, callback: Function) => {
  const user = new userModel({
    provider: newUser.provider,
    googleId: newUser.googleId,
    firstname: newUser.firstname,
    lastname: newUser.lastname,
    username: newUser.username,
    email: newUser.email,
    photo: newUser.photo,
  });
  user.save(callback);
};
