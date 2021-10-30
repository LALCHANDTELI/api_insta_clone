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
const Post = require("../models/Post");





router.get("/", (req, res) => {
  
   res.send("health okay okay");
  
 
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
    const  {name, email, pin, photo,followers=[],following=[] } = await req.body;
    const username = email.split("@");
    if(!photo){
     photo = "no photo" 
    }
    
   
       const user = new User({name, email,username:username[0], pin, photo,followers,following});
      await user.save();
    return res.send("user successfully saved and store in database");
  } catch (error) {
    console.log(error);
    res.send("error catch");
  }
});



router.post("/follow", async (req, res) => {
  try {
    const  {username, follower} = await req.body;
    
       const user =  User.update({username, {$push: {followers:follower}}});
    
    
    
      await user.save();
    return res.send("user successfully saved and store in database");
  } catch (error) {
    console.log(error);
    res.send("error catch");
  }
});


router.post("/add_new_post", async (req, res) => {
  try {
    const  {userI, userN,  userP, userD } = await req.body;
       const post = new Post({userI, userN,  userP, userD});
      await post.save();
    return res.send("post uploaded successfully");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});




router.get("/all_post", async (req, res) => {
  try {
      const all_post = await Post.find().sort({_id:-1});
    return res.send(all_post);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});



router.post("/user_post", async (req, res) => {
  try {
    const {userN} = await req.body;
      const all_post = await Post.find({userN}).sort({_id:-1});
    return res.send(all_post);
  } catch (error) {
    console.log(error);
    res.send(error.message);
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


router.post("/find_by_username", async (req, res) => {
    try {
    const  {username} = await req.body;
      
    const user = await User.findOne({ username });
    if (user) {
      return res.send(user);
    }else{
        return res.send("user not found");
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});



router.post("/search_user", async (req, res) => {
    try {
    const  {username} = await req.body;
      
      if(username.length>0){
         
   const users = await User.find({ username: { $regex: '.*' + username + '.*' } }).limit(5);
      
      
      const data = await users.map((data)=>{
        return data.username
      })
      res.send(data);
}else{
res.send("empty");
}


      
   
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});









router.post("/welcome_mail",async(req,res)=>{
      try {
    const  {email,subject,body} = await req.body;
     
      
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
        
    from:{name:'WELCOME', address:'top.clone.factory@gmail.com'},
    to: email,
    subject: `${subject}`,
    text: `${body}`,
    html:`   
    <div  style="text-align:center; background-color:#003049;">
    <div style="background-color:#023047; padding:10px; margin-bottom: 10px;">
    <h3 class="container" style="background-color:#ffba08; padding:5px;">${body}</h3>
    </div>
<img width="50%" src="https://res.cloudinary.com/dcxhqv5lu/image/upload/v1635513401/welcome_qlvmsr.jpg"/>
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
       

  } catch (error) {
    console.log(error);
    res.send(error);
  }
});





router.post("/send_mail",async(req,res)=>{
      try {
    const  {email,subject,body} = await req.body;
      
    const user = await User.findOne({ email });
    if (true) {
      
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
    to: email,
    subject: `${subject}`,
    text: `${body}`,
    html:`   
    <div  style="text-align:center; background-color:#003049;">
    <div style="background-color:#023047; padding:10px; margin-bottom: 10px;">
    <h3 class="container" style="background-color:#ffba08; padding:5px;">${body}<br/><span style="color:#ffba08;">THIS OTP VALID FOR 5:00 Minutes</span></h3>
    </div>
<img width="50%" src="https://res.cloudinary.com/dcxhqv5lu/image/upload/v1635513470/saeed-karimi-JrrWC7Qcmhs-unsplash_pwcvaj.jpg"/>
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
    const user = await User.updateMany({email},{$set:{pin}});
        res.status(201).send(user);
   
  }
  catch(error){
   console.log(error); 
    res.send(error)
  }
  
});



router.put("/update_profile",async(req, res) => {
  try {
    const {email,photo} = req.body
    const user = await User.updateMany({email},{$set:{photo}});
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
