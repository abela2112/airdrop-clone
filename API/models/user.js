const bycryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  name: {
    type: String,
    min: 4,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    min: 8,
    require: true,
  },
});
userSchema.pre("save", function () {
  const salt = bycryptjs.genSaltSync(10);
  this.password = bycryptjs.hashSync(this.password, salt);
});
userSchema.methods.comparePassword = async function (candidatePasword) {
  const isMatch = await bycryptjs.compare(candidatePasword, this.password);
  return isMatch;
};
userSchema.methods.createJWT = function () {
  const token = jwt.sign(
    { email: this.email, userId: this._id },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
  return token;
};

module.exports = model("user", userSchema);
