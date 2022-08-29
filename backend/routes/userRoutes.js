const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
} = require("../controller/userController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/logout", logoutUser);
router.get("/me", isAuthenticatedUser, getUserDetails);

module.exports = router;
