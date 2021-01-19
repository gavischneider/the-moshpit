import { ObjectId } from "mongodb";

const tagModel = require("../models/tag");

const tagController = {
  // Get all tags
  getTags(callback: Function) {
    tagModel.find((err: Error, data: any) => {
      if (err) {
        console.log(err);
      } else {
        callback(null, data);
      }
    });
  },
};

module.exports = tagController;
