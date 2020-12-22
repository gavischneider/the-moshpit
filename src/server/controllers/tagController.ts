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

  addTag(req: any, res: any) {
    // Check if tag exists
    const tagTitle: string = req.body.title;
    const newPostId = req.body.newPostId;

    tagModel.findOne({ title: tagTitle }).exec((err: Error, result: any) => {
      if (result) {
        // The tag exists, add post id to it
        result.postIds.push(newPostId);
        result.save((err: Error) => {
          if (err) {
            console.log(`Error saving new tag: ${err}`);
          }
        });
      } else {
        // The tag does not exist, create new one
        tagModel.addTag(tagTitle, newPostId, (err: Error, data: any) => {
          if (err) {
            console.log("error occured while creating new tag", err);
          } else {
            console.log(data);
          }
        });
      }
    });
  },
};
