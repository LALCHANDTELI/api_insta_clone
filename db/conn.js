const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

mongoose.connect(process.env.DATABASE).catch((error) => {
  console.log(error);
});


cloudinary.config({
  cloud_name: process.env.CLOUD,
  api_key: process.env.KEY,
  api_secret: process.env.SECRET,
});
