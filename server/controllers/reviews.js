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
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ["select", "sort", "page", "limit", "search"];

  // Loop over removedFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  console.log(reqQuery);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators like gt gtrterthan less than
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  console.log(queryStr);

  // Select Fields
  if (req.query.search) {
    const searchQuery = req.query.search.split(",").join(" ");
    query = Review.find({
      $or: [
        {
          title: { $regex: searchQuery, $options: "i" },
        },
        {
          review: { $regex: searchQuery, $options: "i" },
        },
      ],
    })
      .populate("user")
      .populate("movie");
  } else {
    //Finding All resource
    query = Review.find(JSON.parse(queryStr))
      .populate("user")
      .populate("movie");
  }

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  let total;

  if (req.query.search) {
    const searchQuery = req.query.search.split(",").join(" ");
    total = await Review.countDocuments({
      $or: [
        { title: { $regex: searchQuery, $options: "i" } },
        {
          review: { $regex: searchQuery, $options: "i" },
        },
      ],
    });
  } else {
    total = await Review.countDocuments();
  }

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const reviews = await query;

  // Pagination Reasult
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit: limit,
    };
  }

  res.status(200).json({
    success: true,
    count: total,
    pagination: pagination,
    data: reviews,
  });
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
  })
    .populate("user")
    .populate("movie");

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
