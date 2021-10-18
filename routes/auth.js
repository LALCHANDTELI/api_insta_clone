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
    const  {name, email, pin } = await req.body;
    const username = email.split("@");
       const user = new User({name, email,username:username[0], pin });
      await user.save();
    return res.send("user successfully saved and store in database");
  } catch (error) {
    console.log(error);
    res.send("error catch");
  }
});


router.post("/checknewuser", async (req, res) => {
    try {
    const  {email} = await req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.send("exist");
    }else{
        return res.send("not exist");
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
    const user = await User.findOne({ email ,pin });
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
