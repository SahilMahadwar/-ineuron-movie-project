const express = require("express");

const { protect, authorize } = require("../middleware/auth");

const {
  getWatchlist,
  addMovieToWatchlist,
  deleteMovieFromWatchlist,
  getSeenlist,
  addMovieToSeenlist,
  deleteMovieFromSeenlist,
  checkIfMovieExistInLists,
} = require("../controllers/list");

const router = express.Router();

router
  .route("/watchlist")
  .get(protect, getWatchlist)
  .post(protect, addMovieToWatchlist)
  .delete(protect, deleteMovieFromWatchlist);

router
  .route("/seenlist")
  .get(protect, getSeenlist)
  .post(protect, addMovieToSeenlist)
  .delete(protect, deleteMovieFromSeenlist);

router.route("/list-check/:id").get(protect, checkIfMovieExistInLists);

module.exports = router;
