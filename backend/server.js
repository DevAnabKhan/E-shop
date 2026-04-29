import app from "./app.js";
import dotenv from "dotenv";
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "./config/.env" });
}
import connectDB from "./db/Database.js";

await connectDB();

process.on("uncaughtException", (err) => {
  console.log(`Error ${err.message}`);
  console.log("shutting down server for handling uncaught Exception ");
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`shutting down server for $${err.message}`);
  console.log("shutting down server for unhandle promise Rejection ");

  server.close(() => {
    process.exit(1);
  });
});
