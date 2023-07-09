const express = require("express");
const { mongoPassword, PORT } = require("./config");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(PORT, (req, res) => {
  console.log(`Server is listening on ${PORT}`);
});
