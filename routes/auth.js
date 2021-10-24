const express = require("express");
const router = express.Router();
const mongodb = require('mongodb');
const nodemailer = require("nodemailer");

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



router.post("/login", async (req, res) => {
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

router.post("/send_mail",async(req,res)=>{
      try {
    const  {email,subject,body,otp} = await req.body;
      
    const user = await User.findOne({ email });
    if (user) {
      
        var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
      user: 'top.clone.factory@gmail.com',
      pass: '@cloneLAL13'
    }
  });
      
        var mailOptions = {
        
    from:{name:'OTP', address:'top.clone.factory@gmail.com'},
    to: 'lalchandteli13@gmail.com',
    subject: `${subject}`,
    text: `${body}`,
    html:`   
    <div  style="text-align:center; background-color:#003049;">
    <div style="background-color:#023047; padding:10px; margin-bottom: 10px;">
    <h3 class="container" style="background-color:#ffba08; padding:5px;">${body}</h3>
    </div>
<img width="50%" src="https://res.cloudinary.com/dcxhqv5lu/image/upload/v1630771178/sl2kiu8yxszpdztnw8nz.jpg"/>
</div>
    `
  };

        transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log("helloooooo",error);
      return res.send(error);
    } else {
      console.log('Email sent: ' + info.response);
       return res.send("sent");
    }
  });
       
    }else{
        return res.send("wrong email and pin");
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});



router.put("/update_pin",async(req, res) => {
  try {
    const {email,pin} = req.body
    const user = await User.updateMany({email,pin})
        res.status(201).send(user);
   
  }
  catch(error){
   console.log(error); 
    res.send(error)
  }
  
});

router.post("/search_by_id", async (req, res) => {
    try {
        const _id = await mongodb.ObjectId(req.body._id);
    const user = await User.findOne({ _id })
    if (user) {
      return res.send(user);
    }else{
        return res.send("not found");
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
