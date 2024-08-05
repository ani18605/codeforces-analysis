import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, TextField } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

function Home() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [institutionName, setInstitutionName] = useState('');
  const [codeforcesHandle, setCodeforcesHandle] = useState('');
  const [codechefHandle, setCodechefHandle] = useState('');
  const [leetcodeHandle, setLeetcodeHandle] = useState('');

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSettings = () => {
    // Handle settings action
    handleClose();
  };

  const handleSave = () => {
    // Handle save action
    console.log('Institution Name:', institutionName);
    console.log('Codeforces Handle:', codeforcesHandle);
    console.log('CodeChef Handle:', codechefHandle);
    console.log('LeetCode Handle:', leetcodeHandle);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Home
          </Typography>
          <div>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleSettings}>Settings</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <div style={{ padding: 16 }}>
        <Typography variant="h5">Settings</Typography>
        <form noValidate autoComplete="off">
          <TextField
            label="Institution Name"
            value={institutionName}
            onChange={(e) => setInstitutionName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Codeforces Handle"
            value={codeforcesHandle}
            onChange={(e) => setCodeforcesHandle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="CodeChef Handle"
            value={codechefHandle}
            onChange={(e) => setCodechefHandle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="LeetCode Handle"
            value={leetcodeHandle}
            onChange={(e) => setLeetcodeHandle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: 16 }}>
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Home;
