/**
 * App configuration.
 * Values are read from the .env file, with sensible defaults for local development.
 */
import "dotenv/config";

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,

  // Secret used to sign and verify JSON Web Tokens
  jwtSecret: process.env.JWT_SECRET,

  // Use the MongoDB URI from .env if set, otherwise fall back to a local database
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    "mongodb://" +
      (process.env.IP || "localhost") +
      ":" +
      (process.env.MONGO_PORT || "27017") +
      "/mernproject",
};

export default config;
