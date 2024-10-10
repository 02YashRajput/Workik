import { fetchDiffData,extractPRInfo} from "../utils/formatPrData.mjs"
import { callHuggingFace } from "../utils/huggingFace.mjs";
import { addCommentToPR } from "../utils/postPRComment.mjs";

export const reviewPullRequestFormGithub = async (req, res) => {
  const event = req.headers['x-github-event'];

  // Check if the event is a pull request
  if (event === 'pull_request') {
    const prData = req.body; // Get the entire payload


    console.log("pull request received");
    const action = prData.action
    if(action === "opened"){

    

    const diffData = await  fetchDiffData(prData.pull_request.diff_url);
    const prInfo = extractPRInfo(prData);

    const aiReview = await callHuggingFace(prInfo,diffData);
    console.log("review generated using ai");
    const repoOwner = prData.pull_request.base.repo.owner.login;
    const repoName = prData.pull_request.base.repo.name;
    const prNumber = prData.pull_request.number;
    addCommentToPR(repoOwner,repoName,prNumber,aiReview);
    console.log("comment posted")
    res.status(200).send('Pull request event handled.');
    } else {
      console.log(`Pull request action '${action}' ignored.`);
      res.status(200).send('Pull request action ignored.');

    }
  
  } else if (event === 'ping') {
    // Handle the ping event
    console.log('Ping event received from GitHub');
    res.status(200).send('Ping event received.');

  } else {
    res.status(200).send('Event not handled.');
  }
}
