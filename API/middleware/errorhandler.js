const errorHandler = (err, req, res, next) => {
  if (err) {
    console.log(err);
    res.json("error");
  }
};
module.exports = errorHandler;
