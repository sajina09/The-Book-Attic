const productModel = require("../model/productModel");
const Book = require("../model/productModel");

/* Get all product / books */

exports.getAllBooks = async (req, res) => {
  let books;
  try {
    books = await Book.find();
  } catch (err) {
    console.log(`Error while getting all books : ${err}`);
  }
  if (!books) {
    return res.status(400).json({
      code: 000,
      message: "No books found",
      error: "Book finding error",
      data: null,
    });
  }
  res.status(200).json({
    code: 000,
    message: "Find all books successful",
    error: null,
    data: {
      books,
    },
  });
};

/* Create a book product  */

exports.createBook = async (req, res, next) => {
  const book = await Book.create(req.body);

  res.status(201).json({
    code: 000,
    message: "Creation Successful",
    error: null,
    data: {
      book,
    },
  });
};

/* Update the book by ID */
exports.updateBook = async (req, res) => {
  let book = await Book.findById(req.params.id);

  if (!book) {
    return res.status(500).json({
      code: 000,
      message: "No books found",
      error: "Book finding error",
      data: null,
    });
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
};

exports.deleteBook = async (req, res) => {
  let book = await Book.findById(req.params.id);

  if (!book) {
    return res.status(500).json({
      code: 000,
      message: "No book found",
      error: "Book finding error",
      data: null,
    });
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
};


/* Update the book by ID */
exports.getSingleBook = async (req, res) => {
  let book = await Book.findById(req.params.id);

  if (!book) {
    return res.status(500).json({
      code: 000,
      message: "No book found",
      error: "Book finding error",
      data: null,
    });
  }

  res.status(200).json({
    code: 000,
    message: "Book detail found successfully",
    error: null,
    data: {
      book,
    },
  });
};