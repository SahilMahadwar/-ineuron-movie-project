const express = require("express");
const { getMe, getAllUsers, deleteUser } = require("../controllers/user");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

// Get Logged User Profile
router.get("/me", protect, getMe);

router.route("/").get(protect, authorize("ADMIN"), getAllUsers);

router.route("/:id").delete(protect, authorize("ADMIN"), deleteUser);

module.exports = router;
