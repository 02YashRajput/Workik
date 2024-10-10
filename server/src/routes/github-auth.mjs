import { Router } from "express";
import passport from "passport";
import dotenv from "dotenv";
import "../strategies/passport-github-strategies.mjs"; // Import your GitHub strategy
import { githubCallBackController } from "../controllers/githubAuthController.mjs";

// Load environment variables from .env file
dotenv.config();

const router = Router();

// Route to start GitHub authentication
router.get("/auth/github", (req, res, next) => {
  console.log("Initiating GitHub authentication...");
  passport.authenticate("github", {
    scope: ["user:email", "repo", "admin:repo_hook"],
  })(req, res, next);
});

// Callback route for GitHub to redirect to after authentication
// Callback route for GitHub to redirect to after authentication

router.get("/auth/github/callback",githubCallBackController);

export default router;
