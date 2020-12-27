import { Publisher } from "../../shared/Publisher";

const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
  name: String,
  url: String,
  image: String,
});

const publisherModel = (module.exports = mongoose.model(
  "publisher",
  publisherSchema
));

// Add new publisher
module.exports.addPublisher = (
  newPName: string,
  newPUrl: string,
  newPImage: string,
  callback: Function
) => {
  const publisher = new publisherModel({
    name: newPName,
    url: newPUrl,
    image: newPImage,
  });
  publisher.save(callback);
};
