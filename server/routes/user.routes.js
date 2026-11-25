/**
 * User routes.
 * Anyone can sign up; users can manage only their own account; admins can list or delete all users.
 */
import express from "express";
import userCtrl from "../controllers/user.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// /api/users
router
  .route("/api/users")
  .get(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.list) // Admin
  .post(userCtrl.create) // Public (sign up)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.removeAll); // Admin

// /api/users/:userId (signed-in user, own account only)
router
  .route("/api/users/:userId")
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

// Load the user for any route with :userId
router.param("userId", userCtrl.userByID);

export default router;
