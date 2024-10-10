import { Router } from "express";

import { User } from "../models/user.mjs";

import { getRepos, makeWebbhooksFromRepos } from "../controllers/reposController.mjs";
const router = Router();

router.get("/api/repos", getRepos);

router.post("/api/repos",makeWebbhooksFromRepos);


export default router;
