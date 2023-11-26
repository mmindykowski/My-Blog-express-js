const mongosse = require("mongoose");

const Post = new mongosse.Schema(
  {
    title: String,
    content: String,
    author: String,
  },
  { timestamps: true }
);

module.exports = mongosse.model("Post", Post);
