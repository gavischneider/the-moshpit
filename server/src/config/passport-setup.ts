const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook").Strategy;
const SpotifyStrategy = require("passport-spotify").Strategy;
const TwitterStrategy = require("passport-twitter");
const userModel = require("../models/user");
const userController = require("../controllers/userController");
import { feeds } from "../constants/feeds";

import { User } from "../../../shared/User";
require("dotenv").config();

passport.serializeUser((user: any, done: any) => {
  done(null, user._id);
});

passport.deserializeUser((id: any, done: any) => {
  userModel
    .findById(id)
    .then((user: any) => {
      done(null, user);
    })
    .catch((error: Error) => {
      done(`Error: ${error}`);
    });
});

// Google
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
          // Initially give the user the default feeds
          new userModel({
            provider: "google",
            googleId: profile.id,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            username: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value,
            sources: feeds,
            joined: new Date(),
          })
            .save()
            .then((newUser: any) => {
              console.log("created new user: ", newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);

// Facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/redirect",
      profileFields: [
        "id",
        "displayName",
        "picture.type(large)",
        "email",
        "name",
      ],
    },
    (accessToken: any, refreshToken: any, profile: any, done: any) => {
      console.log("Passport callback function");
      console.log(profile);

      // Check if user exists in DB
      userModel
        .findOne({ facebookId: profile.id })
        .then((currentUser: User) => {
          if (currentUser) {
            console.log(`User is: ${currentUser}`);
            done(null, currentUser);
          } else {
            // Create new user
            // Initially give the user the default feeds
            new userModel({
              provider: "facebook",
              facebookId: profile.id,
              firstname: profile.name.givenName,
              lastname: profile.name.familyName,
              username: profile.displayName,
              email: profile.emails[0].value,
              photo: profile.photos[0].value,
              sources: feeds,
              joined: new Date(),
            })
              .save()
              .then((newUser: any) => {
                console.log("created new user: ", newUser);
                done(null, newUser);
              });
          }
        });
    }
  )
);

// Spotify
passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: "/auth/spotify/redirect",
    },
    (accessToken: any, refreshToken: any, profile: any, done: any) => {
      console.log("Passport callback function");
      console.log(profile);

      // Check if user exists in DB
      userModel.findOne({ spotifyId: profile.id }).then((currentUser: User) => {
        if (currentUser) {
          console.log(`User is: ${currentUser}`);
          done(null, currentUser);
        } else {
          // Create new user
          // Initially give the user the default feeds
          new userModel({
            provider: "spotify",
            spotifyId: profile.id,
            firstname: profile.displayName.split(" ").slice(0, -1).join(" "),
            lastname: profile.displayName.split(" ").slice(-1).join(" "),
            username: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos.length === 0 ? "" : profile.photos[0].value,
            sources: feeds,
            joined: new Date(),
          })
            .save()
            .then((newUser: any) => {
              console.log("created new user: ", newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);

// Twitter
// passport.use(
//   new TwitterStrategy(
//     {
//       consumerKey: process.env.TWITTER_API_KEY,
//       consumerSecret: process.env.TWITTER_API_SECRET_KEY,
//       callbackURL: "/auth/twitter/redirect",
//     },
//     (accessToken: any, refreshToken: any, profile: any, done: any) => {
//       console.log("Passport callback function");
//       console.log("-----> TWITTER <-----");
//       console.log(profile);

//       // Check if user exists in DB
//       userModel.findOne({ twitterId: profile.id }).then((currentUser: User) => {
//         if (currentUser) {
//           console.log(`User is: ${currentUser}`);
//           done(null, currentUser);
//         } else {
//           // Create new user
//           // Initially give the user the default feeds
//           new userModel({
//             provider: "twitter",
//             spotifyId: profile.id,
//             firstname: profile.name.split(" ").slice(0, -1).join(" "),
//             lastname: profile.name.split(" ").slice(-1).join(" "),
//             username: profile.screen_name,
//             email: profile.emails[0].value, /////------
//             photo: profile.profile_image_url,
//             sources: feeds,
//             joined: new Date(),
//           })
//             .save()
//             .then((newUser: any) => {
//               console.log("created new user: ", newUser);
//               done(null, newUser);
//             });
//         }
//       });
//     }
//   )
// );
