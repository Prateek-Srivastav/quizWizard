module.exports = function (err, req, res, next) {
  res.status(500).send("Something went wrong on our side.");
  console.error(err.message, err);
};
