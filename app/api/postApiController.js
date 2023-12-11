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
};
