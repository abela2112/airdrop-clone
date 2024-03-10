const express = require("express");
const router = express.Router();
const { bookPlace, getMyBooking } = require("../controller/booking");
router.route("/bookPlace").post(bookPlace).get(getMyBooking);

module.exports = router;
