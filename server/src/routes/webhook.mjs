import {Router} from  "express";

import { reviewPullRequestFormGithub } from "../controllers/webhooksController.mjs";



const router  = Router();

router.post('/api/webhook', reviewPullRequestFormGithub);


export default router;