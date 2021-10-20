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



const meddleware = (req, res, next) => {
  return console.log("meddleware called");
  
  next();
}; 


router.get("/", (req, res) => {
  
  
   const sgMail = require('@sendgrid/mail')
   sgMail.setApiKey("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")
  const msg = {
    to: 'pradeep05112001@gmail.com', 
    from: 'lalchandteli13@gmail.com', 
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  sgMail.send(msg)
    .then(() => {
       res.send("sent");
    })
    .catch((error) => {
       res.send("error");
    })
  
 
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
    const  {name, email, pin, photo } = await req.body;
    const username = email.split("@");
    if(!photo){
     photo = "no photo" 
    }
       const user = new User({name, email,username:username[0], pin, photo});
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



router.post("/login",meddleware, async (req, res) => {
    try {
    const  {email} = await req.body;
      
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
