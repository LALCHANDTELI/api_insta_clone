const mongoose = require("mongoose");
const { Schema } = mongoose;
const PostSchema = new Schema({
_id:{
   type: mongoose.ObjectId,
    required: true,
    unique:true
  },
  username:{
    type: String,
    required: true
  },

  photo:{
    type: String,
     required: true
  },
  descriptions: {
    type: String,
    required: true
  }
})


const Post = mongoose.model("posts", PostSchema);

module.exports = Post;
