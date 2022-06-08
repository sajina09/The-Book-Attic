const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/db");


// Handling Uncaught Exception

process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server due to Unhandled Exception");
} )

//Config
dotenv.config({
  path: "backend/config/config.env",
});

/* Connecting to db */
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`The server is running at http://localhost:${process.env.PORT}`);
});

// Unhandled Promises
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});
