const express = require("express");
const router = express.Router();


const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

router.use(
  fileUpload({
    useTempFiles: true,
  })
);

require("../db/conn");
const User = require("../models/User");





router.get("/", (req, res) => {
  res.send("health okay");
});





router.post("/uploadImage", (req, res) => {
  const file = req.files.image;
  cloudinary.uploader.upload(file.tempFilePath, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});




router.post("/register", async (req, res) => {
  try {
    const {name, email, username,photo, pin } = req.body;
    if (!name || !email ||!pin  ) {
      return res.send("please fill all fields");
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.send("user already exist in database");
    }

    const user = new User({name, email,username,photo, pin });
    


      await user.save();
 

    return res.send("user successfully saved and store in database");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
