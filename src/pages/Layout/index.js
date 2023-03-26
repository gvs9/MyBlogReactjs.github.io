import React, { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Avatar, Box, Button, Grid, Menu, MenuItem, Typography } from "@mui/material";

import "./styles.css";
import { UserContext } from "../../context/user";

function Layout({ children }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate()
  
  // Used in drop down menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = anchorEl;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.removeItem("token")
    handleClose()
    navigate("/login")
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <Box className="header">
          <Box className="logo">
            <Link to="/">My Blog</Link>
          </Box>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Box className="profile">
              <Avatar
                src={user.photoUrl}
                alt="Profile Avatar"
                className="avatar"
              />

              <div className="user">
                {user.name}
              </div>
            </Box>
          </Button>
        </Box>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </div>
      <div>{children}</div>
    </>
  );
}

export default Layout;
