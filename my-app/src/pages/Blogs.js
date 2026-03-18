import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// import Navbar from "../components/Navbar";
import Blog from "../components/Blog";
import { getBlogBySearch, getBlogsByRole } from "../api";

const Blogs = () => {
  const [search, setSearch] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result?._id;
  const role = user?.result?.role;

  /* ======================
     TAG HANDLERS
  ====================== */
  const handleAddTag = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  /* ======================
     FETCH BLOGS (ROLE)
  ====================== */
  useEffect(() => {
    const fetchBlogs = async () => {
      if (!userId || !role) return;

      try {
        const res = await getBlogsByRole(userId, role);
setBlogs(res.data);

      } catch (err) {
        console.log("Failed to fetch blogs", err);
      }
    };

    fetchBlogs();
  }, [userId, role]);

  /* ======================
     SEARCH
  ====================== */
  const handleSearch = async () => {
    if (!search.trim() && tags.length === 0) return;

    setHasSearched(true);

    const res = await getBlogBySearch({
      searchQuery: search.trim(),
      tags: tags.join(","),
    });

   setSearchResult(res.data);


    const params = new URLSearchParams();
    if (search.trim()) params.append("searchQuery", search.trim());
    if (tags.length) params.append("tags", tags.join(","));

    navigate(`/blog/search?${params.toString()}`);
  };

  return (
    <>
      {/* <Navbar /> */}

      <Box sx={{ p: 4, bgcolor: "background.default", minHeight: "100vh" }}>
        {/* SEARCH */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 3,
            mb: 4,
          }}
        >
          <TextField
            label="Search Blogs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <TextField
            label="Search Tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
          />

          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>

        {/* TAGS */}
        {tags.length > 0 && (
          <Box sx={{ mb: 3, display: "flex", gap: 1, justifyContent: "center" }}>
            {tags.map((tag, i) => (
              <Button key={i} size="small" onClick={() => handleDelete(tag)}>
                {tag} ❌
              </Button>
            ))}
          </Box>
        )}

        {/* BLOGS */}
        <Typography variant="h5" mb={2}>
          {role === "admin" ? "All Blogs (Admin)" : "My Blogs"}
        </Typography>

        <Grid container spacing={3}>
          {(hasSearched ? searchResult : blogs).length === 0 ? (
            <Typography>No blogs found.</Typography>
          ) : (
            (hasSearched ? searchResult : blogs).map((blog) => (
             <Grid size={{ xs: 12, sm: 6, md: 4 }} key={blog._id}>
                <Blog data={blog} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Blogs;
