import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import {  useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Paper, Typography, List,ListItem,Link } from "@mui/material";
import { LuExternalLink } from "react-icons/lu";

const Home = () => {
  const [user, setUser] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Use navigate to change the URL

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const source = queryParams.get("source");
    const status = queryParams.get("status");

    if (source === "login") {
      if (status === "success") {
        toast.success("Login successful!");
      } else if (status === "failure") {
        toast.error("Login failed. Please try again.");
      }

      // Clear the query parameters from the URL
      queryParams.delete("source");
      queryParams.delete("status");
      navigate({ search: queryParams.toString() }); // Update the URL without reloading
    }
  }, [location, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api");
        console.log(response.data);
        const data = response.data;
        setUser(data.success);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []); // Ensure to add the dependency array to prevent multiple calls

  return (
    <div className="relative pt-20 flex flex-col items-center pb-5">
      <Header user={user} aria-label="Main Header" />
      <Paper className="px-12 py-6 w-[90%] max-w-[1000px] flex flex-col gap-16">
        <Typography
          sx={{ fontWeight: "800" }}
          variant="h4"
          className="text-center"
        >
          Automatic GitHub PR Review System
        </Typography>

        <Paper className="px-8 py-4 flex flex-col gap-6">
          <Typography sx={{ fontWeight: "600" }} variant="h4">
            Project Overview
          </Typography>
          <Typography variant="body1">
            The Automatic GitHub PR Review System is an innovative, AI-driven
            tool designed to automate the process of reviewing pull requests
            (PRs) on GitHub. By leveraging AI, the system analyzes code changes
            for quality, adherence to coding standards, and potential bugs.
          </Typography>
          <Typography variant="body1">
            This tool not only enhances code quality by providing immediate
            feedback to developers but also significantly reduces the time and
            effort required for manual code reviews. It aims to streamline the
            development workflow, allowing teams to focus more on building
            features and less on the review process.
          </Typography>
          <Typography variant="body1">
            Key features of the system include:
          </Typography>
          <ul className="list-disc ml-5">
            <li>Automated detection of code style violations and bugs.</li>
            <li>
              Integration with existing GitHub workflows for seamless usage.
            </li>
            <li>Detailed reports and suggestions for code improvement.</li>
          </ul>
          <Typography variant="body1">
            Overall, the Automatic GitHub PR Review System aims to foster a
            culture of code quality and efficiency in software development
            teams, ultimately leading to better products and happier developers.
          </Typography>
        </Paper>

        <Paper className="px-8 py-4 flex flex-col gap-6">
        <Typography sx={{ fontWeight: "600" }} variant='h4' >
          User Workflow
        </Typography>
        <Typography sx={{ fontWeight: "400" }} variant='h5'>
            Steps to Use the Automatic GitHub PR Review System
          </Typography>
          <List component="ol" sx={{ paddingLeft: 4 }}>
            <ListItem>
              <Typography variant='body1'>
                <strong>1. Login to GitHub:</strong> Click the login button to authenticate your GitHub account.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant='body1'>
                <strong>2. Select a Repository:</strong> After logging in, navigate to the repository selection page.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant='body1'>
                <strong>3. Connect Webhook:</strong> Automatically set up a webhook to listen for new pull requests.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant='body1'>
                <strong>4. Automatic Review:</strong> Once a PR is raised, the system will fetch the PR data and use an AI model to generate a review.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant='body1'>
                <strong>5. Post Review Comment:</strong> The AI-generated review will be posted as a comment on the PR.
              </Typography>
            </ListItem>
          </List>
        </Paper>



      </Paper>
    </div>
  );
};

export default Home;
