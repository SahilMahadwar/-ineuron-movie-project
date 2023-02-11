const express = require("express");

const { protect, authorize } = require("../middleware/auth");

const {
  createMovie,
  getAllMovies,
  getSingleMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movies");

const router = express.Router();

router
  .route("/")
  .get(getAllMovies)
  .post(protect, authorize("ADMIN"), createMovie);

router
  .route("/:id")
  .get(getSingleMovie)
  .put(protect, authorize("ADMIN"), updateMovie)
  .delete(protect, authorize("ADMIN"), deleteMovie);

module.exports = router;
