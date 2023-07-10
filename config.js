require("dotenv").config();

module.exports = {
  mongoUrl: `mongodb+srv://admin:${
    process.env.MONGODB_PASSWORD || ""
  }@cluster0.tjq3i6a.mongodb.net/course?retryWrites=true&w=majority`,
  PORT: process.env.PORT || "5000",
  jwtKey: process.env.JWTKEY,
};
