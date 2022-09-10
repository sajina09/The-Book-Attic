const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  bookName: {
    type: String,
    required: [true, "Please enter a book"],
    trim: true,
  },
  author: {
    type: String,
    required: [true, "Please enter the author"],
  },
  description: {
    type: String,
    required: [true, "Please enter the description "],
  },
  price: {
    type: Number,
    required: [true, "Please enter the price"],
    maxLength: [5, "Price can't exceed 99,999"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  image: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  isSecondHand: {
    type: Boolean,
  },
  genre: {
    type: String,
  },
  ISBN: {
    type: String,
  },
  page: {
    type: Number,
  },
  language: {
    type: String,
  },
  isTranslatedBook: {
    type: Boolean,
  },

  category: {
    type: String,
    required: [true, "Please enter a category"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter available number / Stock"],
    maxLength: [4, "Stock can't exceed 9999"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Book", bookSchema);

/*  to create a collection in mongo db 
there it gets stored as books */
