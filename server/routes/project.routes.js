/**
 * Project routes.
 * Anyone can view projects; only admins can create, edit, or delete them.
 */
import express from "express";
import projectCtrl from "../controllers/project.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// /api/projects
router
  .route("/api/projects")
  .get(projectCtrl.list) // Public
  .post(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.create) // Admin
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.removeAll); // Admin

// /api/projects/:projectId
router
  .route("/api/projects/:projectId")
  .get(projectCtrl.read) // Public
  .put(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.update) // Admin
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.remove); // Admin

// Load the project for any route with :projectId
router.param("projectId", projectCtrl.projectByID);

export default router;
