const express = require("express");
const {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  getSingleBook,
} = require("../controller/productController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

// router.route("/products").get(getAllProducts);

router.get("/books", isAuthenticatedUser, getAllBooks);
router.post("/book/add", createBook);

router.route("/book/:id").put(updateBook).delete(deleteBook).get(getSingleBook);

module.exports = router;
