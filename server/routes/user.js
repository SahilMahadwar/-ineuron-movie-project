const express = require("express");
const { getMe, addMovieToWatchlist } = require("../controllers/user");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

// Get Logged User Profile
router.get("/me", protect, getMe);

router.route("/watchlist").put(protect, addMovieToWatchlist);

module.exports = router;
