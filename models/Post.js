const mongoose = require("mongoose");
const { Schema } = mongoose;
const PostSchema = new Schema({
userI:{
   type: String,
    required: true
  },
  userN:{
    type: String,
    required: true
  },

  userP:{
    type: String,
     required: true
  },
  userD: {
    type: String,
    required: true
  }
}
  )


const Post = mongoose.model("posts", PostSchema);

module.exports = Post;
