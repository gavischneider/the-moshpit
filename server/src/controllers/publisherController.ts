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
};

module.exports = publisherController;
