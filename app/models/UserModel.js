const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const User = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

User.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }
});

module.exports = mongoose.model("User", User);
