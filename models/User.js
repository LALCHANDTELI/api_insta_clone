const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require('jsonwebtoken');
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

UserSchema.methods.tokens = async function(){
  try{
   const t= jwt.sign({_id:this._id.toString(),"hellothisislalchandtelifromrailabhilwararajasthanindia})
              console.log(t)
  }
  catch(error){
    console.log(error);
  }
}

const User = mongoose.model("users", UserSchema);

module.exports = User;
