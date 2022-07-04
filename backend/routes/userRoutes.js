const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  ForgotPassword,
} = require("../controller/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/password/forgot", ForgotPassword);
router.get("/logout", logoutUser);

module.exports = router;
