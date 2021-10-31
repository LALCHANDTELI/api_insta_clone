const mongoose = require("mongoose");
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
  },
  followers:{
    type: Array,
  },
  following: {
     type: Array,
  }
})


const User = mongoose.model("users", UserSchema);

module.exports = User;
