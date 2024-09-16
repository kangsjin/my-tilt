import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  //If the database is already connected, don't connect again
  if (connected) {
    console.log("Database is already connected");
    return;
  }

  // Connect to to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    connected = true;
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
