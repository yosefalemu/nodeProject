const mongoose = require("mongoose");

const connectDb = (url) => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log("connected to DB..."))
    .catch((err) => {
      return err;
    });
};

module.exports = connectDb;
