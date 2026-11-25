/**
 * Qualification controller.
 * CRUD operations for education entries.
 */
import Qualification from "../models/qualification.model.js";
import extend from "lodash/extend.js";
import errorHandler from "../helpers/dbErrorHandler.js";

// Create a new qualification
const create = async (req, res) => {
  const qualification = new Qualification(req.body);
  try {
    await qualification.save();
    return res.status(201).json(qualification);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// Get all qualifications
const list = async (req, res) => {
  try {
    let qualifications = await Qualification.find();
    res.json(qualifications);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// Param middleware: find a qualification by :qualificationId and attach it to req.qualification
const qualificationByID = async (req, res, next, id) => {
  try {
    let qualification = await Qualification.findById(id);
    if (!qualification) {
      return res.status(404).json({
        error: "Qualification not found",
      });
    }
    req.qualification = qualification;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve qualification",
    });
  }
};

// Return a single qualification
const read = (req, res) => {
  return res.json(req.qualification);
};

// Update a qualification with the fields sent in the request body
const update = async (req, res) => {
  try {
    let qualification = req.qualification;
    qualification = extend(qualification, req.body);
    await qualification.save();
    res.json(qualification);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// Delete a single qualification
const remove = async (req, res) => {
  try {
    let qualification = req.qualification;
    let deletedQualification = await qualification.deleteOne();
    res.json(deletedQualification);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// Delete every qualification
const removeAll = async (req, res) => {
  try {
    const result = await Qualification.deleteMany({});
    return res.json({ message: `${result.deletedCount} qualifications deleted` });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  create,
  qualificationByID,
  read,
  list,
  remove,
  removeAll,
  update,
};
