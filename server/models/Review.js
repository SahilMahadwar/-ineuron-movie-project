const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add movie name"],
  },

  review: {
    type: String,
    required: [true, "Please add movie name"],
  },

  rating: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// https://image.tmdb.org/t/p/w600_and_h900_bestv2

module.exports = mongoose.model("Review", ReviewSchema);
