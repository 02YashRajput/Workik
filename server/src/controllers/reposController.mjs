import axios from "axios";
import { User } from "../models/user.mjs";
import { setupWebhook,removeWebhook } from "../utils/githubWebhookManager.mjs";

export const getRepos = async (req, res) => {
  if (req.user) {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${req.user.username}/repos?access_token=${req.user.accessToken}`,
        {
          headers: {
            Authorization: `token ${req.user.accessToken}`,
          },
        }
      );
      console.log("repos fetched successfully");

      const repos = response.data.map((repo) => ({
        name: repo.name, // Name of the repository
        description: repo.description || "", // Description of the repository (default to empty string if undefined)
        html_url: repo.html_url, // Link to the repository
      }));

      const selectedRepos = req.user.selectedRepos.map((repo) => repo.repo);

      // Send the data back as a response
      return res.json({
        msg: "Repositories fetched successfully",
        success: true,
        repos,
        selectedRepos,
      });
    } catch (error) {
      console.error("Error fetching repositories:", error);
      return res
        .status(500)
        .json({ msg: "Error fetching repositories", success: false });
    }
  } else {
    return res.status(401).json({ msg: "Unauthorized", success: false });
  }
};

export const makeWebbhooksFromRepos = async (req, res) => {
  if (req.user) {
    const { selectedRepos } = req.body; // Repositories from the request
    const userSelectedRepos = req.user.selectedRepos; // Repositories from the user

    // Extract repo names from userSelectedRepos for easier comparison
    const userRepoNames = userSelectedRepos.map((repoObj) => repoObj.repo);
    console.log("Received user's Selected Repository Names");

    // Determine which repos to set up (those in selectedRepos but not in userSelectedRepos)
    const reposToSetup = selectedRepos.filter(
      (repo) => !userRepoNames.includes(repo)
    );

    // Determine which repos to remove (those in userSelectedRepos but not in selectedRepos)
    const reposToRemove = userSelectedRepos.filter(
      (repoObj) => !selectedRepos.includes(repoObj)
    );

    try {
      // Setup webhooks for new repos
      const setupWebhookResults = await Promise.all(
        reposToSetup.map(async (repo) => {
          const webHookId = await setupWebhook(
            req.user.username,
            repo,
            req.user.accessToken
          );

          // Check if webHookId is not received and throw an error
          if (!webHookId) {
            throw new Error("Error setting up webhook");
          }

          return { repo, webHookId };
        })
      );
      if (reposToSetup.length > 0) {
        console.log("Added webhooks to repos");
      }
      // Remove webhooks for removed repos
      await Promise.all(
        reposToRemove.map(async (repoObj) => {
          await removeWebhook(
            req.user.username,
            repoObj.repo,
            req.user.accessToken,
            repoObj.webHookId
          );
        })
      );

      if (reposToRemove.length > 0) {
        console.log("Removed webhooks of repos");
      }

      // Prepare the new selectedRepos array
      const newSelectedRepos = [
        ...userSelectedRepos.filter((repoObj) =>
          reposToRemove.every((repo) => repoObj.repo !== repo.repo)
        ),
        ...setupWebhookResults,
      ];

      // Update the user in the database
      await User.updateOne(
        { _id: req.user._id },
        { selectedRepos: newSelectedRepos }
      );

      console.log("Saved list of listed repos to the database");

      return res
        .status(200)
        .json({ msg: "Repos Selected for PR Review", success: true });
    } catch (error) {
      console.error("Error updating repos:", error.message);
      return res
        .status(500)
        .json({ msg: "Error setting up webhook", success: false });
    }
  } else {
    return res.status(401).json({ msg: "Unauthorized", success: false });
  }
};
