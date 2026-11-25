/**
 * Qualification routes.
 * Anyone can view qualifications; only admins can create, edit, or delete them.
 */
import express from "express";
import qualificationCtrl from "../controllers/qualification.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// /api/qualifications
router
  .route("/api/qualifications")
  .get(qualificationCtrl.list) // Public
  .post(authCtrl.requireSignin, authCtrl.isAdmin, qualificationCtrl.create) // Admin
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, qualificationCtrl.removeAll); // Admin

// /api/qualifications/:qualificationId
router
  .route("/api/qualifications/:qualificationId")
  .get(qualificationCtrl.read) // Public
  .put(authCtrl.requireSignin, authCtrl.isAdmin, qualificationCtrl.update) // Admin
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, qualificationCtrl.remove); // Admin

// Load the qualification for any route with :qualificationId
router.param("qualificationId", qualificationCtrl.qualificationByID);

export default router;
