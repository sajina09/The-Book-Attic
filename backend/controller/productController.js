const productModel = require("../model/productModel");
const Book = require("../model/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");

/* Get all product / books */

exports.getAllBooks = catchAsyncErrors(async (req, res, next) => {
  let books;
  try {
    books = await Book.find();
  } catch (err) {
    console.log(`Error while getting all books : ${err}`);
  }
  if (!books) {
    return next(
      new ErrorHandler(400, "No books found", "Book finding error", null)
    );
  }

  res.status(200).json({
    code: 000,
    message: "Find all books successful",
    error: null,
    data: {
      books,
    },
  });
});

/* Create a book product  */

exports.createBook = catchAsyncErrors(async (req, res, next) => {
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
