const express = require("express");
const router = express.Router();

require("../db/conn");
const User = require("../models/User");

router.get("/", (req, res) => {
  res.send("health okay");
});

router.post("/register", async (req, res) => {
  try {
    const {name, email, username,photo, pin } = req.body;
    if (!name || !email ||!username ||!pin  ) {
      return res.send("please fill all fields");
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.send("user already exist in database");
    }

    const user = new User({name, email,username,photo, pin });

    await user.save();

    res.send("user successfully saved and store in database");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
