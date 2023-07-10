const express = require("express");
const router = express.Router();
const { userProfile, login, Register } = require("../controllers/Users");
const { auth } = require("../middleware/check-auth");

router.route("/").get(auth, userProfile);
router.route("/login").post(login);
router.route("/register").post(Register);

module.exports = router;
