/**
 * Express app setup.
 * Registers middleware, mounts all API routes, and handles errors.
 */
import express from "express";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import projectRoutes from "./routes/project.routes.js";
import qualificationRoutes from "./routes/qualification.routes.js";

const app = express();

// ---------- Middleware ----------
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse form request bodies
app.use(cookieParser()); // Read cookies from requests
app.use(compress()); // Compress response bodies
app.use(helmet()); // Set security-related HTTP headers
app.use(cors()); // Allow cross-origin requests

// ---------- Routes ----------
app.use("/", userRoutes);
app.use("/", contactRoutes);
app.use("/", projectRoutes);
app.use("/", qualificationRoutes);
app.use("/", authRoutes);

// ---------- Error handling ----------
// Missing or invalid tokens return 401; any other error returns 400
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

export default app;
