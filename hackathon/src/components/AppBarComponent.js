import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {useNavigate} from "react-router-dom"
import IconButton from "@mui/material/IconButton";


const logoHorizontallyCenter = {
  position: 'absolute', 
    left: '50%', 
    top: '50%',
    transform: 'translate(-50%, -50%)'
}

export default function AppBarComponent() {
  const nav = useNavigate()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color = "primary">
        <Toolbar>
        <div style={logoHorizontallyCenter}>
      <IconButton onClick={(e) => {nav("/")}}>
      <img src="thy-logo.png" width={128} alt="Icon"></img>    

      </IconButton>
    </div>

        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}
