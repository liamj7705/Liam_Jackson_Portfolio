/**
 * Auth controller.
 * Handles sign in / sign out and provides middleware to protect routes.
 */
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import config from "./../../config/config.js";

// Check the user's email and password, then return a signed JWT
const signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ error: "User not found" });

    if (!user.authenticate(req.body.password)) {
      return res.status(401).send({ error: "Email and password don't match." });
    }

    // Include the role in the token so admin checks don't need a database lookup
    const token = jwt.sign({ _id: user._id, role: user.role }, config.jwtSecret);
    res.cookie("t", token, { expire: new Date() + 9999 });

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(401).json({ error: "Could not sign in" });
  }
};

// Clear the auth cookie
const signout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({
    message: "signed out",
  });
};

// Middleware: require a valid JWT. The decoded token is stored on req.auth
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  userProperty: "auth",
});

// Middleware: only allow users to access their own profile
const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized",
    });
  }
  next();
};

// Middleware: only allow admins
const isAdmin = (req, res, next) => {
  const authorized = req.auth && req.auth.role === "admin";
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized as admin",
    });
  }
  next();
};

export default { signin, signout, requireSignin, hasAuthorization, isAdmin };
