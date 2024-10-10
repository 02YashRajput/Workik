import axios from "axios"
import dotenv from "dotenv";
dotenv.config();

export const  addCommentToPR=async(repoOwner, repoName, prNumber, reviewComment)=> {
  const githubToken = process.env.GITHUB_TOKEN; // Ensure this token has access to comment on PRs
  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/pulls/${prNumber}/reviews`;

  const commentBody = `Here is an AI-generated review:\n\n${reviewComment}`;

  try {
      await axios.post(apiUrl, { body: commentBody,event:"COMMENT" }, {
          headers: {
              Authorization: `Bearer ${githubToken}`,
              'Content-Type': 'application/json'
          }
      });
      console.log("Comment posted successfully.");
  } catch (error) {
      console.error("Failed to post comment on PR:", error);
  }
}