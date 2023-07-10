const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncWrapper = require("../middleware/async");
const User = require("../models/User");
const { jwtKey } = require("../config");

const gerenateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    jwtKey,
    { expiresIn: "3d" }
  );
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (email.trim() === "" || !password.trim() === "") {
    return res.status(400).json({ error: "email/password can't be blank" });
  }
  const user = await User.findOne({ email });
  if (user) {
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: "Invalid password" });
    }
    const token = gerenateToken(user);

    return res.status(200).json({ token });
  } else {
    return res.status(400).json({ error: "user does not exist" });
  }
};
const Register = asyncWrapper(async (req, res) => {
  const { username, password, email } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    return res.status(400).json({ error: "User already exists" });
  }
  const hash = await bcrypt.hash(password, 12);
  const avatar = `https://api.dicebear.com/6.x/lorelei/svg?seed=${username}`;
  const newUser = new User({
    username,
    password: hash,
    email,
    avatar,
    created_at: new Date().toISOString(),
  });
  const addedUser = await newUser.save();
  return res.status(200).json(addedUser);
});
const userProfile = async (req, res) => {
  const { id, username, email, avatar, created_at } = await User.findById(
    req.user.id
  );

  res.status(200).json({ id, username, email, avatar, created_at });
};

module.exports = {
  login,
  userProfile,
  Register,
};
