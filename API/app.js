const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
//router
const userAuth = require("./routes/user");
const profile = require("./routes/profile");
const place = require("./routes/place");
const booking = require("./routes/booking");

//midleware
const authorize = require("./middleware/authorize");
const errorHandler = require("./middleware/errorhandler");
const uploadMiddleware = multer({ dest: "uploads/" });

//models
const Place = require("./models/place");
const Booking = require("./models/booking");

require("express-async-errors");
require("dotenv").config();
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "https://airdrop-clone.netlify.app",
  })
);
app.use("/api/v1/user", userAuth);
app.use("/api/v1/account", profile);

app.post("/api/v1/photo/upload-by-link", async (req, res) => {
  const { link } = req.body;
  let newPath = "pic" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newPath,
  });
  res.json(newPath);
});
app.post(
  "/api/v1/photo/upload",
  uploadMiddleware.array("photo", 100),
  (req, res) => {
    const fileArray = [];
    const file = req.files;
    for (let i = 0; i < file.length; i++) {
      const { originalname, path, filename } = file[i];
      const ext = originalname.split(".")[1];
      fileArray.push(filename + "." + ext);
      fs.renameSync(path, path + "." + ext);
    }

    //console.log(path, path + "." + ext);

    res.json(fileArray);
  }
);
app.get("/api/v1/home-place", async (req, res) => {
  const placeDoc = await Place.find({});
  res.status(200).json(placeDoc);
});
app.get("/api/v1/home-place/:id", async (req, res) => {
  const { id } = req.params;
  const placeDoc = await Place.findById({ _id: id });
  res.status(200).json(placeDoc);
});
app.use("/api/v1/account/booking", authorize, booking);
app.use("/api/v1", authorize, place);
app.use(errorHandler);
const start = () => {
  mongoose.connect(process.env.MONGO_URL);
  app.listen(4000, () => {
    console.log("server is listening on port 4000....");
  });
};
start();
// app.post("/register", async (req, res) => {
//   const user = await User.create(req.body);
//   res.json(user);
// });
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (user) {
//     const isPasswordMatch = await bycryptjs.compare(password, user.password);
//     if (!isPasswordMatch) {
//       throw new Error("incorrect password");
//     }
//     const token = jwt.sign(
//       { email: user.email, userId: user._id },
//       process.env.JWT_SECRET
//     );
//     res
//       .cookie("token", token, { SameSite: "none" })
//       .json({ name: user.name, email });
//   } else {
//     throw new Error("invalid credentials");
//   }
// });
// app.get("/profile", async (req, res) => {
//   const { token } = req.cookies;
//   if (token) {
//     const user = jwt.verify(token, process.env.JWT_SECRET);
//     const { name, email, _id } = await User.findById({ _id: user.userId });
//     res.status(200).json({ name, email, _id });
//   } else {
//     res.status(404).json("no user");
//   }
// });
// app.post("/logout", (req, res) => {
//   res.cookie("token", "", { SameSite: "none" }).json(true);
// });
