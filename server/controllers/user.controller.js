/**
 * User controller.
 * CRUD operations for user accounts.
 */
import User from "../models/user.model.js";
import extend from "lodash/extend.js";
import errorHandler from "../helpers/dbErrorHandler.js";

// Sign up a new user
const create = async (req, res) => {
  try {
    // Users can't make themselves admin; the role always defaults to "user"
    delete req.body.role;

    const user = new User(req.body);
    await user.save();
    return res.status(200).json({
      message: "Successfully signed up!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// Get all users (only safe fields are returned)
const list = async (req, res) => {
  try {
    let users = await User.find().select("name email updated created");
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// Param middleware: find a user by :userId and attach it to req.profile
const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve user",
    });
  }
};

// Return a single user, without the password hash or salt
const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

// Update a user's details
const update = async (req, res) => {
  try {
    // Users can't change their own role
    delete req.body.role;

    let user = req.profile;
    user = extend(user, req.body);
    user.updated = Date.now();
    await user.save();

    // Hide sensitive fields before sending the response
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// Delete a single user
const remove = async (req, res) => {
  try {
    let user = req.profile;
    let deletedUser = await user.deleteOne();

    // Hide sensitive fields before sending the response
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// Delete every user
const removeAll = async (req, res) => {
  try {
    const result = await User.deleteMany({});
    return res.json({ message: `${result.deletedCount} users deleted` });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create, userByID, read, list, remove, removeAll, update };
