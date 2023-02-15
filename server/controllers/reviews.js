const asyncHandler = require("../middleware/async");
const Review = require("../models/Review");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Create review
// @route   POST /api/v1/reviews
// @access  Private
// @role    Admin
exports.createReview = asyncHandler(async (req, res, next) => {
  // Create user
  const review = await Review.create(req.body);

  res.status(201).json({ success: true, data: review });
});

// @desc    Get all reviews for movie
// @route   GET /api/v1/reviews
// @access  Public
exports.getReviewsForMovie = asyncHandler(async (req, res, next) => {
  // Find all review
  const review = await Review.find({ movie: req.params.id }).populate("user");

  res.status(200).json({ success: true, data: review });
});

// @desc    Update review
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
// @role    ADMIN USER
exports.updateReview = asyncHandler(async (req, res, next) => {
  // Check if the review belongs to user before updating

  const reviewUserCheck = await Review.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!reviewUserCheck) {
    return next(new ErrorResponse(`Review dosnt belong to this user`, 500));
  }

  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!review) {
    return next(
      new ErrorResponse(`Review not found id of ${req.params.id}`, 404)
    );
  }

  res.status(201).json({ success: true, data: review });
});

// @desc    Delete review
// @route   DELETE /api/v1/reviews/:id
// @access  Private
// @role    Admin
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`Review not found id of ${req.params.id}`, 404)
    );
  }

  review.remove();

  res.status(201).json({ success: true, data: {} });
});
