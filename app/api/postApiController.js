const Post = require("../models/PostModel");
const User = require("../models/UserModel");

module.exports = {
  index: (req, res) => {
    const findConfig = req.query.authorId ? { author: req.query.authorId } : {};
    Post.find(findConfig)
      .populate("author")
      .lean()
      .then((posts) => {
        res.status(200).json(posts);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
  post: (req, res) => {
    Post.findById(req.params.id)
      .populate("author")
      .lean()
      .then((post) => {
        res.status(200).json(post);
      })
      .catch((err) => {
        res.status(404).json({ error: "Resource not found" });
      });
  },
  create: (req, res) => {
    console.log(req.body);
    const newPost = new Post({
      ...req.body,
      author: req.userId,
    });
    newPost.save();

    User.updateOne(
      { _id: req.userId },
      { $push: { posts: newPost._id } }
    ).catch((err) => {
      res.status(500).json({ error: err });
    });

    res.status(201).json(newPost);
  },
  update: (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body)
      .then((post) => {
        res.status(204);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
  delete: (req, res) => {
    Post.findByIdAndDelete(req.params.id)
      .populate("author")
      .then((post) => {
        User.updateOne(
          { _id: post.author._id },
          { $pull: { posts: req.params.id } }
        ).catch((err) => {
          res.send(err);
        });

        res.status(204);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
};
