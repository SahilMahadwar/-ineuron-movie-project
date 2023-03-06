const asyncHandler = require("../middleware/async");
const List = require("../models/List");
const Movie = require("../models/Movie");
const ErrorResponse = require("../utils/errorResponse");
const { isValidObjectId } = require("mongoose");

// @desc    Get Logged In Users watchlist
// @route   GET /api/v1/list/watchlist
// @access  Private
exports.getWatchlist = asyncHandler(async (req, res, next) => {
  let query;

  query = List.find({
    type: "WATCHLIST",
    user: req.user._id,
  }).populate("movie");

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
  const total = await List.countDocuments({
    type: "WATCHLIST",
    user: req.user._id,
  });
  query = query.skip(startIndex).limit(limit);

  // Executing query
  const list = await query;

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
    count: list.length,
    pagination: pagination,
    data: list,
  });
});

// @desc    Add Movie To Watchlist
// @route   POST /api/v1/list/watchlist
// @access  Private
exports.addMovieToWatchlist = asyncHandler(async (req, res, next) => {
  // check if movie is valid objectId
  if (!isValidObjectId(req.params.id)) {
    return next(new ErrorResponse(`Movie Id is not valid object Id`, 500));
  }

  //check if movie is valid
  const movieCheck = await Movie.findById(req.params.id);

  if (!movieCheck) {
    return next(new ErrorResponse(`Movie Not Found`, 404));
  }

  // check if movie already exist in watchlist
  const checkInWatchlist = await List.findOne({
    type: "WATCHLIST",
    movie: req.params.id,
    user: req.user._id,
  });

  if (checkInWatchlist) {
    return next(
      new ErrorResponse(`Movie Already Exists in users watchlist`, 500)
    );
  }

  // add to watchlist
  const newItem = await List.create({
    type: "WATCHLIST",
    movie: req.params.id,
    user: req.user._id,
  });

  const list = await List.findById(newItem._id).populate("movie");

  res.status(201).json({ success: true, data: list });
});

// @desc    Delete movie from watchlist
// @route   DELETE /api/v1/list/watchlist
// @access  Private
exports.deleteMovieFromWatchlist = asyncHandler(async (req, res, next) => {
  // check if movie is valid objectId
  if (!isValidObjectId(req.params.id)) {
    return next(new ErrorResponse(`Movie Id is not valid object Id`, 500));
  }

  const movie = await List.findOne({
    type: "WATCHLIST",
    movie: req.params.id,
    user: req.user._id,
  });

  if (!movie) {
    return next(new ErrorResponse(`Movie not found in users watchlist`, 404));
  }

  movie.remove();

  res.status(201).json({ success: true, data: {} });
});

// SeenLists

// @desc    Get Logged In Users Seenlist
// @route   GET /api/v1/list/Seenlist
// @access  Private
exports.getSeenlist = asyncHandler(async (req, res, next) => {
  let query;

  query = List.find({
    type: "SEENLIST",
    user: req.user._id,
  }).populate("movie");

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
  const total = await List.countDocuments({
    type: "SEENLIST",
    user: req.user._id,
  });
  query = query.skip(startIndex).limit(limit);

  // Executing query
  const list = await query;

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
    count: list.length,
    pagination: pagination,
    data: list,
  });
});

// @desc    Add Movie To Seenlist
// @route   POST /api/v1/list/Seenlist
// @access  Private
exports.addMovieToSeenlist = asyncHandler(async (req, res, next) => {
  // check if movie is valid objectId
  if (!isValidObjectId(req.params.id)) {
    return next(new ErrorResponse(`Movie Id is not valid object Id`, 500));
  }

  //check if movie is valid
  const movieCheck = await Movie.findById(req.params.id);

  if (!movieCheck) {
    return next(new ErrorResponse(`Movie Not Found`, 404));
  }

  // check if movie already exist in Seenlist
  const checkInSeenlist = await List.findOne({
    type: "SEENLIST",
    movie: req.params.id,
    user: req.user._id,
  });

  if (checkInSeenlist) {
    return next(
      new ErrorResponse(`Movie Already Exists in users Seenlist`, 500)
    );
  }

  // add to Seenlist
  const newItem = await List.create({
    type: "SEENLIST",
    movie: req.params.id,
    user: req.user._id,
  });

  const list = await List.findById(newItem._id).populate("movie");

  res.status(201).json({ success: true, data: list });
});

// @desc    Delete movie from Seenlist
// @route   DELETE /api/v1/list/Seenlist
// @access  Private
exports.deleteMovieFromSeenlist = asyncHandler(async (req, res, next) => {
  // check if movie is valid objectId
  if (!isValidObjectId(req.params.id)) {
    return next(new ErrorResponse(`Movie Id is not valid object Id`, 500));
  }

  const movie = await List.findOne({
    type: "SEENLIST",
    movie: req.params.id,
    user: req.user._id,
  });

  if (!movie) {
    return next(new ErrorResponse(`Movie not found in users Seenlist`, 404));
  }

  movie.remove();

  res.status(201).json({ success: true, data: {} });
});

// @desc    Check if movie exists in lists
// @route   GET /api/v1/list/list-check/:id
// @access  Private
exports.checkIfMovieExistInLists = asyncHandler(async (req, res, next) => {
  // check if movie is valid objectId
  if (!isValidObjectId(req.params.id)) {
    return next(new ErrorResponse(`Movie Id is not valid object Id`, 500));
  }

  console.log(req.user._id);

  const watchlist = await List.findOne({
    type: "WATCHLIST",
    movie: req.params.id,
    user: req.user._id,
  });

  const seenlist = await List.findOne({
    type: "SEENLIST",
    movie: req.params.id,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    data: {
      watchlist: watchlist ? true : false,
      seenlist: seenlist ? true : false,
    },
  });
});
