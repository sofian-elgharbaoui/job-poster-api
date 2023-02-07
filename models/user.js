const mongoose = require("mongoose");

// never store any password as a String in the db
const bcrypt = require("bcryptjs");

// we use the array to send an error msg if exists
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    minlength: 2,
  },

  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },

  password: {
    type: String,
    required: [true, "Please provide a  password"],
    minlength: 6,
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// step 2, then save. I DID THIS STEP TO MAKE THE CODE LEANER IN THE CONTROLLER
UserSchema.pre("save", async function (next) {
  this.name = this.name.toLowerCase();
  this.email = this.email.toLowerCase();

  // hashing the password
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

module.exports = mongoose.model("User", UserSchema);
