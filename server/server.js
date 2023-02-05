const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

//Load env vars
dotenv.config({ path: "../.env" });

//Create App
const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("short"));
}

// Api Home
app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

// 404 Endpoint
app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Ineuron Movie API  running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);

  // Close server and exit process
  server.close(() => process.exit(1));
});
