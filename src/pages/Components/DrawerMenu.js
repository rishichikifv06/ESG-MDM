import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";
import ListSubheader from "@mui/material/ListSubheader";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const DrawerMenu = (props) => {
  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={props.toggleDrawer(false)}
      onKeyDown={props.toggleDrawer(false)}
    >
      <List
        subheader={
          <ListSubheader
            sx={{
              bgcolor: "#2196f3",
              color: "white",
              padding: "7px",
              fontSize: "20px",
              paddingLeft: "10px",
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={props.toggleDrawer()}
            >
              <MenuIcon />
            </IconButton>
            Menu
          </ListSubheader>
        }
      >
        {["Dashboard", "My Account", "My Settings"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 && <DashboardIcon />}
                {index === 1 && <AccountBoxIcon />}
                {index === 2 && <SettingsIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer open={props.open} onClose={props.toggleDrawer(false)}>
      {list()}
    </Drawer>
  );
};

export default DrawerMenu;
