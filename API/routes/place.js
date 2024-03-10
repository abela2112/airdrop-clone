const express = require("express");
const router = express.Router();
const {
  addPlace,
  getPlace,
  getSinglePlace,
  updatePlace,
} = require("../controller/place");
router.route("/place").post(addPlace).get(getPlace);
router.route("/place/:id").get(getSinglePlace).patch(updatePlace);
module.exports = router;
