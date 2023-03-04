const express = require("express");
const { getMe } = require("../controllers/user");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

// Get Logged User Profile
router.get("/me", protect, getMe);

module.exports = router;
