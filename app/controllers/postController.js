const Post = require("../models/PostModel");
const User = require("../models/UserModel");

module.exports = {
  index: (req, res) => {
    const findConfig = req.query.authorId ? { author: req.query.authorId } : {};
    Post.find(findConfig)
      .populate("author")
      .lean()
      .then((posts) => {
        console.log(posts);
        res.render("blogViews/blog", { posts: posts });
      })
      .catch((err) => {
        res.send(err);
      });
  },
  post: (req, res) => {
    Post.findById(req.params.id)
      .populate("author")
      .lean()
      .then((post) => {
        res.render("blogViews/singlePost", post);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  create: (req, res) => {
    console.log(req.body);
    const newPost = new Post({ ...req.body, author: res.locals.userId });
    newPost.save();

    User.updateOne(
      { _id: res.locals.userId },
      { $push: { posts: newPost._id } }
    ).catch((err) => {
      res.send(err);
    });

    res.redirect("/blog/");
  },
  update: (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body)
      .then((post) => {
        res.redirect("/blog/" + post._id);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  delete: (req, res) => {
    Post.findByIdAndDelete(req.params.id)
      .then(() => {
        res.redirect("/blog/");
      })
      .catch((err) => {
        res.send(err);
      });
  },
  editForm: (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        res.render("blogViews/editPost", post);
      })
      .catch((err) => {
        res.send(err);
      });
  },
};
