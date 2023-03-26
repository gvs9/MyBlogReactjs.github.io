import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import "./styles.css";

function BlogList({blogs}) {

  const handleBlogClick = ({redirectUrl}) => {
    window.location.href = redirectUrl;
  }

  return (
    <div>
      <Box className='blogs'>
        <Grid container spacing={2}>
          {blogs.map((blog) => (
            <Grid item xs={12} sm={4} key={blog.id}>
              <Box
                className="blog"
                onClick={() => handleBlogClick(blog)}
              >
                <img
                  src={blog.imageUrl}
                  alt={blog.name}
                  className="blogImage"
                />
                <Typography variant="subtitle1" color="textPrimary">
                  {blog.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default BlogList;