const express = require("express");
const {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  getSingleBook,
} = require("../controller/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// router.route("/products").get(getAllProducts);

router.get("/books", getAllBooks);
router.post(
  "/book/add",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createBook
);

router
  .route("/book/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateBook)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBook)
  .get(getSingleBook);

module.exports = router;
