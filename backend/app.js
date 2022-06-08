const express = require("express");

const dotenv = require("dotenv");

//Config
dotenv.config({
  path: "backend/config/config.env",
});

const app = express();

module.exports = app;
