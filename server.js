/**
 * Server entry point.
 * Connects to MongoDB, then starts the Express app on the configured port.
 */
import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";

// Use native JavaScript promises with Mongoose
mongoose.Promise = global.Promise;

// ---------- Database connection ----------
mongoose.connect(config.mongoUri).then(() => {
  console.log("Connected to the database!");
});

mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

// ---------- Root route ----------
// Simple health check to confirm the API is running
app.get("/", (req, res) => {
  res.json({ message: "Welcome to User application." });
});

// ---------- Start server ----------
app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});
