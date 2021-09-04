const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const UserSchema = new Schema({
name:{
  type:String,
  required:true
},
  email: {
    type: String,
    required: true,
    unique:true
  },
  username:{
    type: String,
  required: true ,
  },

  photo:{
    type: String,
    default:"no photo"
  },
  pin: {
    type: String,
    required: true
  }
})

UserSchema.pre("save", async function (next) {
  if (this.isModified("pin")) {
    this.pin = await bcrypt.hash(this.pin, 12);
  }
  next();
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
