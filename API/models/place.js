const { Schema, model, SchemaType } = require("mongoose");
const placeSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "user" },
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuests: Number,
  price: Number,
});

module.exports = model("place", placeSchema);
