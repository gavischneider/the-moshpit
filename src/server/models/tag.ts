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
