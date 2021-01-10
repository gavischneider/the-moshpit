import { ObjectId } from "mongodb";
import { Tag } from "../../shared/Tag";

const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  title: String,
  postIds: [
    {
      type: ObjectId,
      ref: "posts",
    },
  ],
});

const tagModel = (module.exports = mongoose.model("tag", tagSchema));

// Add new tag
// module.exports.addTag = (
//   newTagTitle: string,
//   postId: ObjectId,
//   callback: Function
// ) => {
//   let ids: ObjectId[] = [];
//   ids.push(postId);
//   const tag = new tagModel({
//     title: newTagTitle,
//     postIds: ids,
//   });
//   tag.save(callback);
// };
