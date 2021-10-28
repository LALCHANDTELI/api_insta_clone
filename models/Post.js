const mongoose = require("mongoose");
const { Schema } = mongoose;
const PostSchema = new Schema({
user_id:{
   type: String,
    required: true,
   unique:false
  },
  username:{
    type: String,
    required: true,
     unique:false
  },

  photo:{
    type: String,
     required: true,
     unique:false
  },
  descriptions: {
    type: String,
    required: true,
     unique:false
  }
})


const Post = mongoose.model("posts", PostSchema);

module.exports = Post;
