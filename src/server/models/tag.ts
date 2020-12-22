import { Tag } from "../../shared/Tag";

const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  title: String,
  postIds: [
    {
      type: String,
    },
  ],
});

const tagModel = (module.exports = mongoose.model("tag", tagSchema));

// Get all tags
module.exports.getTags = (callback: Function) => {
  tagModel.find((err: Error, data: any) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, data);
    }
  });
};

// Add new tag
module.exports.addTag = (
  newTagTitle: string,
  postId: string,
  callback: Function
) => {
  const tag = new tagModel({
    title: newTagTitle,
    postIds: [...postId],
  });
  tag.save(callback);
};
