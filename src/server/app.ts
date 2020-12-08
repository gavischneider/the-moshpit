import express, {
  Application,
  Request,
  Response,
  NextFunction,
  Router,
} from "express";

const feeds = require("./constants/feeds");

require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");

const postModel = require("./models/post");

const app: Application = express();
app.use(express.json());

const port = process.env.PORT || 5000;

const connectionString = process.env.MONGO_CONNECTION_STRING;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err: Error) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user/", userRoutes);
app.use("/post/", postRoutes);

// -----Temporary code to test out initial post storage functionality-----
(function () {
  feeds.map((feed: string) => {
    postModel.getPostsFromUrl(feed, (err: Error, data: any) => {
      if (err) {
        console.log("An error occured", err);
      } else {
        console.log(data);
        const rssFeed = data.items;

        rssFeed.map((post: any) => {
          // Start building the post object
          const newPost = {
            title: post.title,
            id: post.id,
            description: post.description,
            url: post.url,
            created: post.created,
            author: post.author,
            category: post.category,
            enclosures: post.enclosures,
            image: "",
          };
          // We have the data, now we need to check where the image is
          if (newPost.enclosures !== []) {
            newPost.image = newPost.enclosures.url;
          } else {
            newPost.image = postModel.getImgFromHTML(newPost.description);
          }
          // Data is ready to be stored
          postModel.addPost(newPost, (err: Error, data: any) => {
            if (err) {
              console.log("An error occured", err);
            } else {
              console.log("Data stored in DB: ");
              console.log(data);
            }
          });
        });
      }
    });
  });
})();
// ------------------------------------------------------------------------

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
