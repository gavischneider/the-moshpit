const mongoose = require("mongoose");
import { ObjectId } from "mongodb";
import { User } from "../../../shared/User";

const userSchema = new mongoose.Schema({
  provider: String,
  googleId: String,
  facebookId: String,
  spotifyId: String,
  twitterId: String,
  firstname: String,
  lastname: String,
  username: String,
  email: String,
  photo: String,
  sources: Array,
  joined: Date,
});

const userModel = (module.exports = mongoose.model("user", userSchema));

module.exports.addUser = (newUser: any, callback: Function) => {
  let [tMonth, tDay, tYear] = new Date().toLocaleDateString("en-US").split("/");
  const todaysDate = `${tMonth}/${tDay}/${tYear}`;
  const user = new userModel({
    provider: newUser.provider,
    googleId: newUser.googleId,
    facebookId: newUser.facebookId,
    spotifyId: newUser.spotifyId,
    twitterId: newUser.twitterId,
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
