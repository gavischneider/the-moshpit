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
    () => {
      // passport callback
    }
  )
);
