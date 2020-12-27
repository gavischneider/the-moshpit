const publisherModel = require("../models/publisher");

const publisherController = {
  // Get all publishers
  getPublishers(callback: Function) {
    publisherModel.find((err: Error, data: any) => {
      if (err) {
        console.log(`Error getting publishers: ${err}`);
      } else {
        callback(null, data);
      }
    });
  },
};

module.exports = publisherController;
