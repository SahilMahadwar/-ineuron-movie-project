const asyncHandler = require("../middleware/async");

const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get logged in user
// @route   GET /api/v1/user/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorResponse(`User not available `, 500));
  }

  res.status(200).json({
    success: true,
    data: req.user,
  });
});

// @desc    Get logged in user
// @route   GET /api/v1/user/me
// @access  Private
// @role    Admin
exports.getAllUsers = asyncHandler(async (req, res, next) => {
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
    query = User.find({
      $or: [{ name: { $regex: searchQuery, $options: "i" } }],
    });
  } else {
    //Finding All resource
    query = User.find(JSON.parse(queryStr));
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
  const total = await User.countDocuments();
  query = query.skip(startIndex).limit(limit);

  // Executing query
  const users = await query;

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
    data: users,
  });
});
