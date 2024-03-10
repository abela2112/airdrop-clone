const Booking = require("../models/booking");
const bookPlace = async (req, res) => {
  const {
    body: { name, phoneNum, checkIn, checkOut, maxGuests, place, price },
    userId,
  } = req;
  console.log(req.body);
  const booking = await Booking.create({
    user: userId,
    name,
    phoneNum,
    checkIn,
    checkOut,
    maxGuests,
    place,
    price,
  });
  res.json(booking);
};
const getMyBooking = async (req, res) => {
  const { userId } = req;
  const bookDoc = await Booking.find({ user: userId }).populate("place");
  res.json(bookDoc);
};
module.exports = { bookPlace, getMyBooking };
