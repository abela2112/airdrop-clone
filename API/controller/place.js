const Place = require("../models/place");
const unAuthorizedError = require("../errors/unAuthorizedError");
const notFoundError = require("../errors/notFoundError");

const addPlace = async (req, res) => {
  const {
    body: {
      title,
      description,
      address,
      addedPhotos,
      checkIn,
      checkOut,
      maxGuests,
      perks,
      extraInfo,
      price,
    },
    userId,
  } = req;
  const placeDoc = await Place.create({
    owner: userId,
    title,
    description,
    address,
    photos: addedPhotos,
    checkIn,
    checkOut,
    maxGuests,
    perks,
    extraInfo,
    price,
  });
  res.status(200).json(placeDoc);
};
const getPlace = async (req, res) => {
  const { userId } = req;
  const place = await Place.find({ owner: userId });
  res.status(200).json(place);
};
const getSinglePlace = async (req, res) => {
  const { id } = req.params;
  const placeDoc = await Place.findById(id);
  res.status(200).json(placeDoc);
};
const updatePlace = async (req, res) => {
  const {
    params: { id },
    body: {
      title,
      description,
      address,
      checkIn,
      checkOut,
      maxGuests,
      perks,
      extraInfo,
      price,
    },
    userId,
  } = req;

  const placeDoc = await Place.findById({ _id: id });
  if (!placeDoc) {
    throw new notFoundError();
  }
  // console.log(
  //   title,
  //   description,
  //   address,
  //   checkIn,
  //   checkOut,
  //   maxGuest,
  //   perks,
  //   extraInfo,
  //   placeDoc.owner.toString(),
  //   userId
  // );
  if (userId !== placeDoc.owner.toString()) throw new unAuthorizedError();
  await Place.updateOne(
    { _id: id },
    {
      title,
      description,
      address,
      checkIn,
      checkOut,
      maxGuests,
      perks,
      extraInfo,
      price,
    }
  );
  res.json(placeDoc);
};
module.exports = { addPlace, getPlace, getSinglePlace, updatePlace };
