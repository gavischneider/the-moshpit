const mongoose = require("mongoose");
import { ObjectId } from "mongodb";
import { User } from "../../../shared/User";

const userSchema = new mongoose.Schema({
  provider: String,
  googleId: String,
  firstname: String,
  lastname: String,
  username: String,
  email: String,
  photo: String,
  sources: Array,
  joined: Date,
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
  let [tMonth, tDay, tYear] = new Date().toLocaleDateString("en-US").split("/");
  const todaysDate = `${tMonth}/${tDay}/${tYear}`;
  const user = new userModel({
    provider: newUser.provider,
    googleId: newUser.googleId,
    firstname: newUser.firstname,
    lastname: newUser.lastname,
    username: newUser.username,
    email: newUser.email,
    photo: newUser.photo,
    sources: newUser.sources,
    joined: todaysDate,
  });
  user.save(callback);
};
