const mongoose = require("mongoose");
const { Schema } = mongoose;
const PostSchema = new Schema({
user_id:{
   type: String,
    required: true
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
