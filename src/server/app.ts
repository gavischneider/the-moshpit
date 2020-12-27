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

const authCheck = (req: any, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "User has not been authenticated",
    });
  } else {
    next();
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
