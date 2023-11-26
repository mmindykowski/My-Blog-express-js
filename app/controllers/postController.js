const Post = require(".../models/PostModel");

module.exports = {
  index: () => {
    index: (req, res) => {
      Post.find({})
        .lean()
        .then((posts) => {res.send(posts);})
        .catch((err) => {
          res.send(err);
        });
    };
  },
};
