import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";

import "./styles.css";
import { getBlogs, getCategories } from "../../api/categories";
import BlogList from "../../component/BlogList";

function Home() {
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [selectedCatId, setSelectedCatId] = useState()

  let fetchCategories = async () => {
    const data = await getCategories();
    if (data.statusCode === 200) {
      const cats = data.data.data
      setCategories(cats);
      setSelectedCatId(cats[0].id)
      handleCategoryClick(cats[0])
    } else {
      console.log(data);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchBlogs = async (name) => {
    const data = await getBlogs(name);
    if (data.statusCode === 200) {
      setBlogs(data.data.data);
    } else {
      console.log(data);
    }
  };

  const handleCategoryClick = (category) => {
   setBlogs([]);
   setSelectedCatId(category.id)
   let name= category.name.toLowerCase().replace(' ', '-');
   fetchBlogs(name)
  };

  return (
    <div style={{ overflowX: 'auto', width: "100%"}}>
      <Grid container spacing={2} sx={{ overflowX: "scroll" }}>
        {categories.map((category) => (
          <Grid key={category.id} item>
            <Box
              className={`category ${selectedCatId === category.id ? "categorySelected" : ""}`}
              onClick={() => handleCategoryClick(category)}
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                className='categoryImage'
              />
              <div className='categoryText'>{category.name}</div>
            </Box>
          </Grid>
        ))}
      </Grid>
      <BlogList blogs={blogs} />
      </div>
  );
}

export default Home;
