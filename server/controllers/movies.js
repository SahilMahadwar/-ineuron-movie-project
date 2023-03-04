const asyncHandler = require("../middleware/async");
const Movie = require("../models/Movie");

const ErrorResponse = require("../utils/errorResponse");

// @desc    Create movie
// @route   POST /api/v1/movies
// @access  Private
// @role    Admin
exports.createMovie = asyncHandler(async (req, res, next) => {
  // Create user
  const movie = await Movie.create(req.body);

  res.status(201).json({ success: true, data: movie });
});

// @desc    Get all movies
// @route   GET /api/v1/movies
// @access  Public
exports.getAllMovies = asyncHandler(async (req, res, next) => {
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
    query = Movie.find({
      $or: [{ name: { $regex: searchQuery, $options: "i" } }],
    });
  } else {
    //Finding All resource
    query = Movie.find(JSON.parse(queryStr));
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
  const total = await Movie.countDocuments();
  query = query.skip(startIndex).limit(limit);

  // Executing query
  const movies = await query;

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
    count: movies.length,
    pagination: pagination,
    data: movies,
  });
});

// @desc    Get single movie
// @route   GET /api/v1/movies/:id
// @access  Public
exports.getSingleMovie = asyncHandler(async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    return next(
      new ErrorResponse(`Movie not found id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: movie });
});

// @desc    Update movie
// @route   PUT /api/v1/movies/:id
// @access  Private
// @role    Admin
exports.updateMovie = asyncHandler(async (req, res, next) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!movie) {
    return next(
      new ErrorResponse(`Movie not found id of ${req.params.id}`, 404)
    );
  }

  res.status(201).json({ success: true, data: movie });
});

// @desc    Delete movie
// @route   DELETE /api/v1/movies/:id
// @access  Private
// @role    Admin
exports.deleteMovie = asyncHandler(async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    return next(
      new ErrorResponse(`Movie not found id of ${req.params.id}`, 404)
    );
  }

  movie.remove();

  res.status(201).json({ success: true, data: {} });
});
