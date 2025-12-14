import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Task Manager
        </Typography>

        <Button color="inherit" onClick={() => {
          auth.logout();
          navigate("/login");
        }}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
