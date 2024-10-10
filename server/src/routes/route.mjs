import { Router } from "express";
import GithubAuthRoute from "./github-auth.mjs"
import HomeRoute from "./home.mjs"
import ReposRoute from "./repos.mjs"
import WebHookRoute from "./webhook.mjs"
const router = Router();

router.use(GithubAuthRoute);
router.use(HomeRoute);
router.use(ReposRoute);
router.use(WebHookRoute); 

export default router;

