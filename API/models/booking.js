const { Schema, model } = require("mongoose");
const bookingSchema = new Schema({
  user: { type: Schema.Types.ObjectId },
  name: String,
  phoneNum: { type: String, require: true },
  checkIn: { type: Date, require: true },
  checkOut: { type: Date, require: true },
  maxGuests: Number,
  place: { type: Schema.Types.ObjectId, ref: "place" },
  price: Number,
});
module.exports = model("booking", bookingSchema);
