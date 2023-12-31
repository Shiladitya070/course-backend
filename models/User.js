const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  created_at: String,
  avatar: String,
});

module.exports = model("User", userSchema);
