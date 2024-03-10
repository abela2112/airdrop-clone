const notFoundError = require("../errors/notFoundError");
const unAuthorizedError = require("../errors/unAuthorizedError");
const User = require("../models/user");
//const jwt = require("jsonwebtoken");
const userRegister = async (req, res) => {
  const user = await User.create(req.body);
  res.status(200).json(user);
};
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const isPasswordMatch = user.comparePassword(password);
    if (!isPasswordMatch) {
      throw new unAuthorizedError("incorrect password");
    }
    const token = user.createJWT();
    res
      .cookie("token", token, { SameSite: "none" })
      .json({ name: user.name, email });
  } else {
    throw new notFoundError("invalid credentials");
  }
};

module.exports = { userLogin, userRegister };
