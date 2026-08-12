import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Reuse existing connection
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    const connection = await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected");
    console.log(`📂 Database Host: ${connection.connection.host}`);

    return connection;
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);
    throw error;
  }
};

export default connectDB;