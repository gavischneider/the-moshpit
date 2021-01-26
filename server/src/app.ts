export {};

import express, { Application, Request, Response, NextFunction } from "express";

import { Publisher } from "../../shared/Publisher";

const feeds: Array<Publisher> = require("./constants/feeds").feeds;

require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
//const cookieSession = require("cookie-session");
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const cors = require("cors");
const redis = require("redis");
const connectRedis = require("connect-redis");
const session = require("express-session");
const loadAllFeeds = require("./services/loadAllFeeds");
//const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");
const tagRoutes = require("./routes/tags");
const publisherRoutes = require("./routes/publishers");

const app: Application = express();
app.use(express.json());

const RedisStore = connectRedis(session);
const redisPort = process.env.REDIS_PORT || 10064;
//Configure redis client
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: redisPort,
  password: process.env.REDIS_PASSWORD,
});
redisClient.on("error", (err: Error) => {
  console.log("Could not establish a connection with redis. " + err);
});
redisClient.on("connect", (err: Error) => {
  console.log(`Connected to redis successfully on port ${redisPort}`);
});

// Configure session middleware
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.REDIS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      maxAge: 1000 * 60 * 60, // session max age in miliseconds
    },
  })
);

// app.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000, // 1 Day
//     keys: [process.env.COOKIE_KEY],
//   })
// );
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

app.use("/users/", userRoutes);
app.use("/post/", postRoutes);
app.use("/auth/", authRoutes);
app.use("/publisher/", publisherRoutes);

var allF = "";
// Load all feeds when app starts
(function () {
  loadAllFeeds((err: Error, data: any) => {
    if (err) {
      console.log(`Problem loading feeds: ${err}`);
    } else {
      console.log(data);
      allF = data;
    }
  });
})();

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

app.get("/feeds", (req: any, res: any) => {
  res.send(allF);
});

app.get("/session", (req: any, res: any) => {
  console.log("|----------> SESSION <----------|");
  res.send(req.session);
});

app.get("/user", (req: any, res: any) => {
  console.log("|----------> USER <----------|");
  res.send(req.user);
  //console.log(req);
  //res.send("");
});

app.get("/", authCheck, (req: any, res: Response) => {
  //console.log("|----------> SESSION <----------|");
  //console.log(req.session);

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
