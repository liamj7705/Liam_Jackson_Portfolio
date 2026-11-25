/**
 * Auth routes.
 * POST /auth/signin  - sign in and receive a token
 * GET  /auth/signout - sign out
 */
import express from "express";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/auth/signin").post(authCtrl.signin);
router.route("/auth/signout").get(authCtrl.signout);

export default router;
