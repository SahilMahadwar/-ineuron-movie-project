const asyncHandler = require("../middleware/async");
const Review = require("../models/Review");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Create review
// @route   POST /api/v1/reviews
// @access  Private
// @role    Admin
exports.createReview = asyncHandler(async (req, res, next) => {
  // Create review
  const newReview = await Review.create({
    title: req.body.title,
    review: req.body.review,
    movie: req.body.movie,
    user: req.user.id,
  });

  const review = await Review.findById(newReview._id).populate("user");

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

// @desc    Get all reviews for movie
// @route   GET /api/v1/reviews
// @access  Public
exports.getAllReviews = asyncHandler(async (req, res, next) => {
  // Find all review
  const review = await Review.find().populate("user").populate("movie");

  res.status(200).json({ success: true, data: review });
});

// @desc    Get all reviews for movie
// @route   GET /api/v1/reviews
// @access  Public
exports.getSingleReview = asyncHandler(async (req, res, next) => {
  // Find all review
  const review = await Review.findById(req.params.id);

  res.status(200).json({ success: true, data: review });
});

// @desc    Update review
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
// @role    ADMIN USER
exports.updateReview = asyncHandler(async (req, res, next) => {
  // Check if the review belongs to user before updating

  const reviewUserCheck = await Review.findById(req.params.id);

  if (!reviewUserCheck) {
    return next(new ErrorResponse(`Review Not Found`, 404));
  }

  if (reviewUserCheck.user._id.toString() !== req.user.id.toString()) {
    return next(new ErrorResponse(`Review dosnt belong to this user`, 404));
  }

  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate("user");

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
