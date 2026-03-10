import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/Database.js";

await connectDB();

process.on("uncaughtException", (err) => {
  console.log(`Error ${err.message}`);
  console.log("shutting down server for handling uncaught Exception ");
});

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({
    path: "./config/.env",
  });
}

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

process.on("unhandleRejection", (err) => {
  console.log(`shutting down server for $${err.message}`);
  console.log("shutting down server for unhandle promise Rejection ");

  server.close(() => {
    process.exit(1);
  });
});
