const asyncHandler = require("../middleware/async");
const Movie = require("../models/Movie");

const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get logged in user
// @route   GET /api/v1/user/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  if (req.user) {
    return next(new ErrorResponse(`User not available `, 500));
  }

  res.status(200).json({
    success: true,
    data: req.user,
  });
});
