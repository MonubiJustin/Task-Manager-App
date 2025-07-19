module.exports = (err, req, res, next) => {
  console.log(err.stack);

  res.status(500).json({ msg: "Something went wrong" });
};
