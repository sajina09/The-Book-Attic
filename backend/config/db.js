const mongoose = require("mongoose");

/* Function to connect to a mongo db */
const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongo db connected with server : ${data.connection.host}`);
    })
    .catch((err) => {
      console.log("Err while connecting db ", err);
    });
};

module.exports = connectDatabase;
