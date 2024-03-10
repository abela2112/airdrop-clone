const express = require("express");
const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
//const cookieParser=require('cookie-parser')
const User = require("../models/user");
router.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const { name, email, _id } = await User.findById(user.userId);
    res.status(200).json({ name, email, _id });
  } else {
    res.status(404).json("no user");
  }
});
router.post("/logout", (req, res) => {
  res.cookie("token", "", { SameSite: "none" }).json(true);
});

module.exports = router;
