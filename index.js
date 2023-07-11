const morgan = require("morgan");
const express = require("express");
const { mongoUrl, PORT } = require("./config");
const { default: mongoose } = require("mongoose");
const user = require("./routes/users");
const course = require("./routes/courses");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/user", user);
app.use("/course", course);
mongoose.connect(mongoUrl, { useNewUrlParser: true }).then(() => {
  console.log("DB CONNECTED!");
  return app.listen(PORT, () => console.log("Server is runnig on " + PORT));
});
