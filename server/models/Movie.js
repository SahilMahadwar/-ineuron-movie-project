const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add movie name"],
  },

  tmdbId: {
    type: Number,
    required: [true, "Please add Tmdb Id"],
  },

  poster: {
    type: String,
    required: [true, "Please add poster"],
  },

  description: {
    type: String,
    required: [true, "Please add description"],
  },

  status: {
    type: String,
    required: false,
  },

  tagline: {
    type: String,
    required: false,
  },

  spokenLanguage: {
    type: String,
    required: false,
  },

  runtime: {
    type: Number,
    required: false,
  },

  genres: {
    type: Array,
    required: false,
  },

  releaseDate: {
    type: String,
    required: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// https://image.tmdb.org/t/p/w600_and_h900_bestv2

module.exports = mongoose.model("Movie", MovieSchema);
