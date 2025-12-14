import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function Layout() {
  return (
    <Box display="flex" minHeight="100vh">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <Box flex={1} display="flex" flexDirection="column">
        {/* Top bar */}
        <TopBar />

        {/* Page content injected by router */}
        <Box p={3} maxWidth={1200} mx="auto" width="100%">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
