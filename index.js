const morgan = require("morgan");
const express = require("express");
const { mongoUrl, PORT } = require("./config");
const { default: mongoose } = require("mongoose");
const user = require("./routes/users");
const bodyParser = require("body-parser");

const app = express();
const jsonErrorHandler = (err, req, res, next) => {
  res.status(err.status).send({
    status: err.status,
    message: err.message,
  });
  return next();
};
app.use(jsonErrorHandler);

app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/user", user);
mongoose.connect(mongoUrl, { useNewUrlParser: true }).then(() => {
  console.log("DB CONNECTED!");
  return app.listen(PORT, () => console.log("Server is runnig on " + PORT));
});
