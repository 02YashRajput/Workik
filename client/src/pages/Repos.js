import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { RiGitBranchFill } from "react-icons/ri";
import {
  Card,
  Paper,
  TextField,
  Button,
  Typography,
  CardContent,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";

const Repos = () => {
  const [user, setUser] = useState(false);
  const [repositories, setRepositories] = useState([]);
  const [selectedRepos, setSelectedRepos] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 8;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [waiting, setWaiting] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/repos");
        const data = response.data;
        setUser(data.success);
        setRepositories(data.repos || []);
        console.log({data})
        const initialSelectedRepos = new Set(data.selectedRepos || []);
        setSelectedRepos(initialSelectedRepos);
        setWaiting(false)
      } catch (error) {
        console.error(error);
        setError("Failed to fetch repositories.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const handleSubmit = async () => {
    const selectedReposArray = Array.from(selectedRepos);
    try {
      await axios.post("/api/repos", { selectedRepos: selectedReposArray });
      toast.success("Selected repositories submitted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit selected repositories.");
    }
  };

  useEffect(()=>{
    console.log(selectedRepos)
  },[selectedRepos])
  // Handle search
  const filteredRepos = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle pagination
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = filteredRepos.slice(indexOfFirstRepo, indexOfLastRepo);
  const totalPages = Math.ceil(filteredRepos.length / reposPerPage);

  return (
    <div className="relative pt-20 flex flex-col items-center pb-5">
      <Header user={user} aria-label="Main Header" />
      {
  waiting ? (
    <p>Loading...</p>
  ) : !user ? (
    <Card>
      <CardContent>
        Please Log In First
      </CardContent>
    </Card>
  ) : (
    <Paper className="px-16 py-6 w-[90%] flex flex-col gap-16 relative">
      <div>
        <Typography variant="h3" sx={{ fontWeight: "600", fontSize: "2rem" }}>
          Select Repository for AI PR Review
        </Typography>
        <Typography variant="h4" sx={{ fontSize: "1.25rem" }}>
          Choose the repositories you want to apply AI-powered PR review services to.
        </Typography>
      </div>
      <TextField
        className="rounded-lg"
        label="Search Repositories"
        variant="outlined"
        value={searchTerm}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {currentRepos.map((repo, index) => (
            <Card key={index}>
              <CardContent className="flex flex-col gap-6">
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: "1rem",
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "600",
                    gap: "1rem",
                  }}
                >
                  <RiGitBranchFill className="text-3xl" />
                  {repo.name}
                </Typography>
                <Typography variant="body1">
                  {repo.description || "No Description Given"}
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedRepos.has(repo.name)}
                      onChange={() => {
                        const updatedSelectedRepos = new Set(selectedRepos);
                        if (updatedSelectedRepos.has(repo.name)) {
                          updatedSelectedRepos.delete(repo.name);
                        } else {
                          updatedSelectedRepos.add(repo.name);
                        }
                        setSelectedRepos(updatedSelectedRepos);
                      }}
                      color="primary"
                    />
                  }
                  label="Select for PR Review"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            variant="contained"
            color={currentPage === i + 1 ? "primary" : "default"}
          >
            {i + 1}
          </Button>
        ))}
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ position: "absolute", bottom: "1.25rem", right: "4rem" }}
      >
        Submit
      </Button>
    </Paper>
  )
}
    </div>
  );
};

export default Repos;
