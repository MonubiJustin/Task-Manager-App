module.exports = (err, req, res, next) => {
    console.log(err.message);

    res.status(500).json({msg: err})
}