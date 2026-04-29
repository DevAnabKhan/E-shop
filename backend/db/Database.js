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

const connectDB = async () => {
  try {
    console.log("MONGODB_URI:", process.env.MONGODB_URI); // ← add this

    const conn = await mongoose.connect(`${process.env.MONGODB_URI}/e-shop`, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
