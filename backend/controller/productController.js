const Book = require("../model/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const Product = require("../model/productModel");

/* Get all product / books */

exports.getAllBooks = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 20;
  const bookCounts = await Book.countDocuments();

  const apiFeatures = new ApiFeatures(Book.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  let books = await apiFeatures.query;
  let filteredProductsCount = books.length;
  apiFeatures.pagination(resultPerPage);
  // books = await apiFeatures.query;

  if (!books) {
    return next(
      new ErrorHandler(400, "No books found", "Book finding error", null)
    );
  }

  res.status(200).json({
    code: 200,
    message: "Find all books successful",
    error: null,
    data: {
      books,
      bookCounts,
      resultPerPage,
      filteredProductsCount,
    },
  });
});

/* Create a book product  */

exports.createBook = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.body.id;
  const book = await Book.create(req.body);

  res.status(201).json({
    code: 201,
    message: "Creation Successful",
    error: null,
    data: {
      book,
    },
  });
});

/* Update the book by ID */
exports.updateBook = catchAsyncErrors(async (req, res) => {
  let book = await Book.findById(req.params.id);

  if (!book) {
    return next(
      new ErrorHandler(
        500,
        `Book with ${req.params.id} ID doesn't exist`,
        "Book finding error"
      )
    );
  }

  book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    code: 000,
    message: "Updated Successfully",
    error: null,
    data: {
      book,
    },
  });
});

/* Delete the book by ID */

exports.deleteBook = catchAsyncErrors(async (req, res) => {
  let book = await Book.findById(req.params.id);

  if (!book) {
    return next(
      new ErrorHandler(
        500,
        `Book with ${req.params.id} ID doesn't exist`,
        "Book finding error"
      )
    );
  }
  await book.remove();

  res.status(201).json({
    code: 000,
    message: "Deleted Successfully",
    error: null,
    data: {
      book,
    },
  });
});

/* Get single book by ID : get details of a book */

exports.getSingleBook = catchAsyncErrors(async (req, res, next) => {
  let book = await Book.findById(req.params.id);
  if (!book) {
    return next(
      new ErrorHandler(
        400,
        `Book with ${req.params.id} ID doesn't exist`,
        "Book finding error"
      )
    );
  }

  res.status(200).json({
    code: 200,
    message: "All book successfully fetched",
    error: null,
    data: {
      book,
    },
  });
});

/* Create or Update Review */
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user.id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((r) => {
      if ((r) => r.user.toString() === req.user.id.toString()) {
        r.rating = rating;
        r.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  // calculating the avg by adding all and dividing by total number of ratings
  product.reviews.forEach((r) => {
    avg += r.ratings;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

/* Get all reviews */
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    review: product.reviews,
  });
});

/* Delete  reviews */
exports.deleteReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter((r) => {
    r._id.toString() !== req.query.id.toString();
  });

  let avg = 0;

  // calculating the avg by adding all and dividing by total number of ratings
  reviews.forEach((r) => {
    avg += r.ratings;
  });
  const ratings = avg / reviews.length || 0;
  const numOfReviews = reviews.length || 0;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    review: product.reviews,
  });
});
