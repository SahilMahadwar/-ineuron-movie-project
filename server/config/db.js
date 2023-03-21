const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.set("strictQuery", false);

  // const conn = await mongoose.connect(process.env.MONGO_URL, {
  //   dbName: "movieapp",
  // });

  const conn = await mongoose.connect(process.env.MONGO_URL);

  console.log(`Mongodb Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
