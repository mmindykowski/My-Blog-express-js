const Post = require("../models/PostModel");

module.exports = {
  index: (req, res) => {
    Post.find({})
      .lean()
      .then((posts) => {
        res.render('blogViews/blog', {posts: posts} )
      })
      .catch((err) => {
        res.send(err);
      });
  },
};
