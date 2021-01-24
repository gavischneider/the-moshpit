export {};
const publisherModel = require("../models/publisher");

const loadAllFeeds = (callback: Function) => {
  publisherModel.find({}, (err: Error, data: any) => {
    if (err) {
      console.log(`Error getting publishers: ${err}`);
    } else {
      console.log(
        "FEED DATA <------------------------------------------------"
      );
      console.log(data);
      callback(null, data);
    }
  });
};

module.exports = loadAllFeeds;
