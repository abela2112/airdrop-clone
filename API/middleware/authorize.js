const unAuthorizedError = require("../errors/unAuthorizedError");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authorize = (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = userId;
    next();
    // const { name, email, _id } = await User.findById({ _id: user.userId });
    // res.status(200).json({ name, email, _id });
  } else {
    throw new unAuthorizedError("unauthorzed user");
  }
};
module.exports = authorize;
