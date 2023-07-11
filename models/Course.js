const { model, Schema } = require("mongoose");

const courseSchema = new Schema({
  title: String,
  description: String,
  author: String,
  created_at: String,
});

module.exports = model("Course", courseSchema);
