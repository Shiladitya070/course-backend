require("dotenv").config();

module.exports = {
  mongoPassword: process.env.MONGODB_PASSWORD || "",
  PORT: process.env.PORT || "5000",
};
