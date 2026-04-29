// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     mongoose.connection.on("connected", () =>
//       console.log("Database connected"),
//     );
//     await mongoose.connect(`${process.env.MONGODB_URI}/e-shop`);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// export default connectDB;
import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return; // ← prevents new connection on every serverless request

  try {
    const conn = await mongoose.connect(`${process.env.MONGODB_URI}/e-shop`, {
      serverSelectionTimeoutMS: 10000,
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
