const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const userModel = require("../models/user");
const userController = require("../controllers/userController");

import { User } from "../../shared/User";
require("dotenv").config();

passport.serializeUser((user: User, done: any) => {
  done(null, user.id);
});

passport.deserializeUser((id: string, done: any) => {
  userModel.findById(id).then((user: User) => {
    done(null, user.id);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // options
      callbackURL: "/auth/google/redirect",
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
    (accessToken: any, refreshToken: any, profile: any, done: any) => {
      console.log("Passport callback function");
      console.log(profile);

      // Check if user exists in DB
      userModel.findOne({ googleId: profile.id }).then((currentUser: User) => {
        if (currentUser) {
          console.log(`User is: ${currentUser}`);
          done(null, currentUser);
        } else {
          // Create new user
          const newUser = {
            provider: "google",
            googleId: profile.id,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            username: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value,
          };

          userModel.addUser(newUser, (err: Error) => {
            if (err) {
              console.log(`An error occured: ${err}`);
            } else {
              console.log(`New user created: ${newUser}`);
              done(null, newUser);
            }
          });
        }
      });
    }
  )
);
