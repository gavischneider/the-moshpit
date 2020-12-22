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
