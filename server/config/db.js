const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.set("strictQuery", false);

  let conn;

  if (process.env.NODE_ENV === "production") {
    conn = await mongoose.connect(process.env.MONGO_URL, {
      dbName: "movieapp",
    });
  } else {
    conn = await mongoose.connect(process.env.MONGO_URL);
  }

  console.log(`Mongodb Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
