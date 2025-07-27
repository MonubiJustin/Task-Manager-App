const mongoose = require("mongoose");

module.exports = function () {
  const db = process.env.DB_URL;

  mongoose
    .connect(db)
    .then(() => console.log(`Connected to DB: ${db}`))
    .catch((err) => {
      console.log(`MongoDB conection error: ${err}`)
      process.exit(1); // Exit with error code to make failure clear
    });
};
