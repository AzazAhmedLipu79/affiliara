"use strict";
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
});

const UserModel = new mongoose.model("USERS", UserSchema);
module.exports = UserModel;
