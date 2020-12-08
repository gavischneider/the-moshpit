const postModel = require("../models/post");

const postController = {
  addPost(req: any, res: any) {
    try {
      console.log("addpost", req.body);
      const post = {
        title: req.body.title,
        id: req.bosy.id,
        description: req.body.description,
        url: req.body.url,
        created: req.body.url,
        author: req.body.author,
        category: req.body.category,
        image: req.body.image,
      };
      postModel.addPost(post, (err: Error, data: any) => {
        if (err) {
          console.log("error occured", err);
        } else {
          console.log(data);
          res.redirect("/user/home");
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  },
};

module.exports = postController;
