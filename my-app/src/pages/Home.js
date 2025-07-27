import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Blog from "../components/Blog";
import { getAllBlogs, getBlogBySearch } from "../api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [search, setSearch] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const handleAddTag = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim() !== '') {
      e.preventDefault();
      const trimmedTag = tagInput.trim();
      if (!tags.includes(trimmedTag)) {
        setTags([...tags, trimmedTag]);
        setTagInput('');
      }
    }
  };

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await getAllBlogs();
        console.log("All Blogs:", response.data);
        setBlogs(response.data.blogs);
      } catch (error) {
        console.log("failed", error);
      }
    };

    getBlogs();
  }, []);

  const handleSearch = async () => {
    if (search.trim() || tags.length > 0) {
      setHasSearched(true);
      const response = await getBlogBySearch({
        search,
        tags: tags.join(","),
      });
      console.log("Search Result:", response.data.blogs);
      setSearchResult(response.data.blogs);
      navigate(`/blog/search?searchQuery=${search || 'none'}&tags=${tags.join(',') || 'none'}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div>
      <Navbar />
      <Box sx={{ padding: 4, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
        {/* Search Section */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            padding: 3,
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            mb: 4,
          }}
        >
          <TextField
            name="search"
            label="Search Blogs"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ minWidth: '250px' }}
          />
          <TextField
            name="tags"
            label="Search Tags"
            variant="outlined"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Press Enter or comma to add"
            sx={{ minWidth: '250px' }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{
              height: '56px',
              px: 4,
              backgroundColor: '#1976d2',
              color: 'white',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#115293',
              },
            }}
          >
            Search
          </Button>
        </Box>

        {/* Tags Section */}
        {tags.length > 0 && (
          <Box
            sx={{
              mt: 1,
              mb: 3,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              justifyContent: 'center',
            }}
          >
            {tags.map((tag, index) => (
              <Button
                key={index}
                size="small"
                variant="outlined"
                onClick={() => handleDelete(tag)}
                sx={{
                  borderRadius: '20px',
                  textTransform: 'none',
                  fontWeight: 500,
                }}
              >
                {tag}
              </Button>
            ))}
          </Box>
        )}

        {/* Blogs Display */}
        <Box>
          <Typography
            variant="h5"
            mb={2}
            fontWeight={600}
            color="#333"
          >
            {hasSearched
              ? `Search Result (${searchResult.length})`
              : 'All Blogs'}
          </Typography>

          <Grid container spacing={3}>
            {(hasSearched ? searchResult : blogs).length === 0 ? (
              <Grid item xs={12}>
                <Typography variant="body1" color="gray">
                  No blogs found.
                </Typography>
              </Grid>
            ) : (
              (hasSearched ? searchResult : blogs).map((blog) => (
                <Grid item key={blog._id} xs={12} sm={6} md={4}>
                  <Blog data={blog} />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Home;

