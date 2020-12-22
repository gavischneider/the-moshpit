export {};

import express, {
  Application,
  Request,
  Response,
  NextFunction,
  Router,
} from "express";

import { Publisher } from "../shared/Publisher";

const feeds: Array<Publisher> = require("./constants/feeds").feeds;

require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const cors = require("cors");
//const session = require("express-session");
//const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");
const tagRoutes = require("./routes/tags");

const postModel = require("./models/post");
//const userModel = require("./models/user");

//const authController = require("./controllers/authController");
//const postController = require("./controllers/postController");
//const userController = require("./controllers/userController");

const app: Application = express();
app.use(express.json());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 1 Day
    keys: [process.env.COOKIE_KEY],
  })
);
//app.use(cookieParser);

app.use(passport.initialize());
app.use(passport.session());

// Allows frontend to call backend API
// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow seesion cookie from browser to come through
  })
);

app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;

const connectionString = process.env.MONGO_CONNECTION_STRING;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err: Error) => console.log(`There was an error: ${err}`));

app.use("/user/", userRoutes);
app.use("/post/", postRoutes);
app.use("/auth/", authRoutes);

// -----Temporary code to test out initial post storage functionality-----
// (function () {
//   console.log("--- FEEDS: ---");
//   console.log(feeds);
//   feeds.map((feed: Publisher) => {
//     postModel.getPostsFromUrl(feed.url, (err: Error, data: any) => {
//       if (err) {
//         console.log("An error occured", err);
//       } else {
//         console.log(data);
//         const rssFeed = data.items;

//         rssFeed.map((post: any) => {
//           // Start building the post object
//           const newPost = {
//             title: post.title,
//             id: post.id,
//             description: post.description,
//             url: post.url,
//             created: post.created,
//             author: post.author,
//             category: post.category,
//             enclosures: post.enclosures,
//             image: "",
//             publisher: feed.name,
//           };
//           // We have the data, now we need to check where the image is
//           if (newPost.enclosures[0] !== undefined) {
//             newPost.image = newPost.enclosures[0].url;
//             console.log("AAAAAAAAAAA We didnt have to look: " + newPost.image);
//           } else {
//             newPost.image = postModel.getImgFromHTML(newPost.description);
//             console.log(
//               "PPPPPPPPPPPP The imaage we found is: " + newPost.image
//             );
//           }
//           // Data is ready to be stored
//           postModel.addPost(newPost, (err: Error, data: any) => {
//             if (err) {
//               console.log("An error occured", err);
//             } else {
//               console.log("Data stored in DB: ");
//               console.log(data);
//             }
//           });
//         });
//       }
//     });
//   });
// })();
// ------------------------------------------------------------------------
const authCheck = (req: any, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "User has not been authenticated",
    });
  }
};

app.get("/", authCheck, (req: any, res: Response) => {
  //res.send("Houme route");
  res.status(200).json({
    authenticated: true,
    message: "User successfully authenticated",
    user: req.user,
    cookies: req.cookies,
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
