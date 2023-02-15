const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add movie name"],
  },

  review: {
    type: String,
    required: [true, "Please add review"],
  },

  rating: {
    type: String,
  },

  movie: {
    type: mongoose.Schema.ObjectId,
    ref: "Movie",
    required: [true, "Please add movie"],
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Please add user"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// https://image.tmdb.org/t/p/w600_and_h900_bestv2

module.exports = mongoose.model("Review", ReviewSchema);
