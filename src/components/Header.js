import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useNavigate } from "react-router-dom";

function Header({ darkMode, toggleTheme }) {
  const navigate = useNavigate();

  // Sprawdzenie, czy użytkownik jest zalogowany
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Obsługa wylogowania
  const handleLogout = () => {
    localStorage.removeItem("user"); // Usunięcie danych użytkownika
    alert("Wylogowano pomyślnie!");
    navigate("/"); // Przekierowanie na stronę główną
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Finance Tracker
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Dynamiczne przyciski */}
          {user ? (
            <>
              <Typography variant="body1" sx={{ marginRight: 1 }}>
                Witaj, {user.firstName}!
              </Typography>
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton color="inherit" onClick={() => navigate("/login")}>
                <LoginIcon />
              </IconButton>
              <IconButton color="inherit" onClick={() => navigate("/register")}>
                <AppRegistrationIcon />
              </IconButton>
            </>
          )}
          {/* Przycisk zmiany motywu */}
          <IconButton color="inherit" onClick={toggleTheme}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
