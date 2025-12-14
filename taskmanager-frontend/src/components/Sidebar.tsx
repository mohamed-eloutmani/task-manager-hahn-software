import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 220;

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: { width: drawerWidth },
      }}
    >
      <Toolbar />
      <List>
        {/* PROJECTS */}
        <ListItemButton
          selected={location.pathname.startsWith("/projects") || location.pathname === "/"}
          onClick={() => navigate("/")}
        >
          <ListItemText primary="Projects" />
        </ListItemButton>

        {/* TASKS */}
        <ListItemButton
          selected={location.pathname.startsWith("/tasks")}
          onClick={() => navigate("/tasks")}
        >
          <ListItemText primary="Tasks" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
