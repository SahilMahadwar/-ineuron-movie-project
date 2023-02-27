const express = require("express");

const { protect, authorize } = require("../middleware/auth");

const {
  createReview,
  getReviewsForMovie,
  updateReview,
  deleteReview,
  getSingleReview,
} = require("../controllers/reviews");

const router = express.Router();

router.route("/").post(protect, authorize("ADMIN", "USER"), createReview);

router
  .route("/:id")
  .get(getSingleReview)
  .put(protect, authorize("ADMIN", "USER"), updateReview)
  .delete(protect, authorize("ADMIN", "USER"), deleteReview);

router.route("/movie-id/:id").get(getReviewsForMovie);

module.exports = router;
