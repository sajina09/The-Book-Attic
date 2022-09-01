const express = require("express");
const {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  getSingleBook,
  createProductReview,
  getProductReviews,
  deleteReviews,
} = require("../controller/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// router.route("/products").get(getAllProducts);

router.get("/products", getAllBooks);
router.post(
  "/admin/product/add",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createBook
);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateBook)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBook);

router.route("/product/:id").get(getSingleBook);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router
  .route("/review")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReviews);

module.exports = router;
