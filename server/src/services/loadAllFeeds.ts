export {};
const publisherModel = require("../models/publisher");

const loadAllFeeds = () => {
  publisherModel.find((err: Error, data: any) => {
    if (err) {
      console.log(`Error getting publishers: ${err}`);
    } else {
      console.log(
        "FEED DATA <------------------------------------------------"
      );
      console.log(data);
      return data;
    }
  });
};

module.exports = loadAllFeeds;
