const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      // options
      callbackURL: "/auth/google/redirect",
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
    (accessToken: any, refreshToken: any, profile: any, done: any) => {
      // passport callback
      console.log("Passport callback function");
      console.log(profile);
    }
  )
);
