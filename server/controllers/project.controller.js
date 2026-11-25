/**
 * Project controller.
 * CRUD operations for portfolio projects.
 */
import Project from "../models/project.model.js";
import extend from "lodash/extend.js";
import errorHandler from "../helpers/dbErrorHandler.js";

// Create a new project
const create = async (req, res) => {
  const project = new Project(req.body);
  try {
    await project.save();
    return res.status(201).json(project);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// Get all projects
const list = async (req, res) => {
  try {
    let projects = await Project.find();
    res.json(projects);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// Param middleware: find a project by :projectId and attach it to req.project
const projectByID = async (req, res, next, id) => {
  try {
    let project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        error: "Project not found",
      });
    }
    req.project = project;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve project",
    });
  }
};

// Return a single project
const read = (req, res) => {
  return res.json(req.project);
};

// Update a project with the fields sent in the request body
const update = async (req, res) => {
  try {
    let project = req.project;
    project = extend(project, req.body);
    await project.save();
    res.json(project);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// Delete a single project
const remove = async (req, res) => {
  try {
    let project = req.project;
    let deletedProject = await project.deleteOne();
    res.json(deletedProject);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// Delete every project
const removeAll = async (req, res) => {
  try {
    const result = await Project.deleteMany({});
    return res.json({ message: `${result.deletedCount} projects deleted` });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create, projectByID, read, list, remove, removeAll, update };
