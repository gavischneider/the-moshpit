import express, {
  Application,
  Request,
  Response,
  NextFunction,
  Router,
} from "express";

require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/users");

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

app.use("/user/", userRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
