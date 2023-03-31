const asyncHandler = require("../middleware/async");
const Movie = require("../models/Movie");
const User = require("../models/User");
const List = require("../models/List");
const ErrorResponse = require("../utils/errorResponse");
const { isValidObjectId } = require("mongoose");
const jwt = require("jsonwebtoken");
const Review = require("../models/Review");

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
    console.log(queryStr);
    let newQueryStr = JSON.parse(queryStr);
    //Finding All resource
    query = Movie.find(
      newQueryStr.tmdbId
        ? { tmdbId: parseInt(newQueryStr.tmdbId) }
        : newQueryStr
    );
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
    total = await Movie.countDocuments({
      $or: [{ name: { $regex: searchQuery, $options: "i" } }],
    });
  } else {
    let newQueryStr = JSON.parse(queryStr);

    total = await Movie.countDocuments(
      newQueryStr.tmdbId
        ? { tmdbId: parseInt(newQueryStr.tmdbId) }
        : newQueryStr
    );
  }

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
    count: total,
    pagination: pagination,
    data: movies,
  });
});

// @desc    Get single movie
// @route   GET /api/v1/movies/:id
// @access  Public
exports.getSingleMovie = asyncHandler(async (req, res, next) => {
  // check if movie is valid objectId
  if (!isValidObjectId(req.params.id)) {
    return next(new ErrorResponse(`Movie Id is not valid object Id`, 500));
  }

  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    return next(
      new ErrorResponse(`Movie not found id of ${req.params.id}`, 404)
    );
  }

  let watchlist = null;
  let seenlist = null;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorResponse(`Invalid user`, 500));
    }

    watchlist = await List.findOne({
      type: "WATCHLIST",
      movie: req.params.id,
      user: user._id,
    });

    seenlist = await List.findOne({
      type: "SEENLIST",
      movie: req.params.id,
      user: user._id,
    });

    watchlist = watchlist ? true : false;
    seenlist = seenlist ? true : false;
  }

  res.status(200).json({
    success: true,
    data: {
      ...movie._doc,
      lists: {
        watchlist,
        seenlist,
      },
    },
  });
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

  const reviews = await Review.find({ movie: movie._id });
  const watchlist = await List.find({ type: "WATCHLIST", movie: movie._id });
  const seenlist = await List.find({ type: "SEENLIST", movie: movie._id });

  reviews.forEach(async (review) => {
    const deleteReview = await Review.findById(review._id);

    deleteReview.delete();
  });

  watchlist.forEach(async (listItem) => {
    const deleteMovieFromWatchList = await List.findById(listItem._id);

    deleteMovieFromWatchList.delete();
  });

  seenlist.forEach(async (listItem) => {
    const deleteMovieFromSeenList = await List.findById(listItem._id);

    deleteMovieFromSeenList.delete();
  });

  movie.delete();

  res.status(201).json({ success: true, data: {} });
});
