/**
 * Contact routes.
 * Anyone can send a message; only admins can view or manage them.
 */
import express from "express";
import contactCtrl from "../controllers/contact.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// /api/contacts
router
  .route("/api/contacts")
  .get(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.list) // Admin
  .post(contactCtrl.create) // Public
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.removeAll); // Admin

// /api/contacts/:contactId (admin only)
router
  .route("/api/contacts/:contactId")
  .get(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.remove);

// Load the message for any route with :contactId
router.param("contactId", contactCtrl.contactByID);

export default router;
