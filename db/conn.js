const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

mongoose.connect(process.env.DATABASE).catch((error) => {
  console.log(error);
});


cloudinary.config({
  cloud_name: "dcxhqv5lu",
  api_key: "431785148661475",
  api_secret: "EZE1Go9aONy0pkA4M5YlNSBTUVY",
});
