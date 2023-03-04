const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["WATCHLIST", "SEENLIST"],
    required: [true, "Please add user type"],
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

module.exports = mongoose.model("List", ListSchema);
