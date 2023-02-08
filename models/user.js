const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
require("dotenv").config();
// never store any password as a String in the db
const bcrypt = require("bcryptjs");

// you can access if you have the token in your localStorage
const jwt = require("jsonwebtoken");

// we use the array to send an error msg if exists
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      minlength: 2,
    },

    email: {
      type: String,
      required: [true, "Please provide your email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },

    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
    },
  },
  { timestamps: true }
).index({ email: 1 }, { unique: true });

// step 2, then save. I DID THIS STEP TO MAKE THE CODE CLEANER IN THE CONTROLLER
UserSchema.pre("save", async function (next) {
  this.name = this.name.toLowerCase();
  this.email = this.email.toLowerCase();
  // hashing the password
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  const isPasswordCorrect = await bcrypt.compare(password, this.password);
  return isPasswordCorrect;
};

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { id: this._id, name: this.name },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

module.exports = mongoose.model("User", UserSchema);
