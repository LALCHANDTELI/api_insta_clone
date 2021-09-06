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
    const  {name, email,photo, pin } = await req.body;
    const username = email.split("@");
    if (!name || !email ||!pin  ) {
      return res.send("please fill all fields");
    }else{
      const userExist = await User.findOne({ email });
    if (userExist) {
      return res.send("user already exist in database");
    }else{
       const user = new User({name, email,username:username[0],photo, pin });
      await user.save();
    return res.send("user successfully saved and store in database");
    }
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});


router.post("/checknewuser", async (req, res) => {
    try {
    const  {email} = await req.body;
    if (!email) {
      return res.send("please fill the email");
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.send("user already exist in database");
    }else{
        return res.send("user not exist");
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});



router.post("/login", async (req, res) => {
    try {
    const  {email,pin} = await req.body;
      
    if (!email || !pin) {
      return res.send("please fill the email");
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.send(user);
    }else{
        return res.send("wrong email and pin");
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});


module.exports = router;
