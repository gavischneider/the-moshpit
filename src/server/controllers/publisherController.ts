const publisherModel = require("../models/publisher");

const publisherController = {
  // Get all publishers
  getPublishers(req: any, res: any) {
    publisherModel.find((err: Error, data: any) => {
      if (err) {
        console.log(`Error getting publishers: ${err}`);
      } else {
        console.log(data);
        res.send(data);
      }
    });
  },

  removePublisher(req: any, res: any) {
    const publisher = req.body.publisher;
    const userId = req.body.userId;

    publisherModel.update(
      { _id: userId },
      { $pull: { "sources.name": publisher } },
      function (err: Error, status: any) {
        if (err) {
          console.log(`Error removing source in db: ${err}`);
        } else {
          console.log(`Source removed from users list, ${status}`);
          res.send(status);
        }
      }
    );
  },
};

module.exports = publisherController;
