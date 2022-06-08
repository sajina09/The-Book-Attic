const app = require("./app");

const dotenv = require("dotenv");

const connectDatabase = require("./config/db")
//Config
dotenv.config({
  path: "backend/config/config.env",
});

/* Connecting to db */
connectDatabase()

app.listen(process.env.PORT, () => {
  console.log(`The server is running at http://localhost:${process.env.PORT}`);
});
