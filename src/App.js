import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#424242" : "#1976d2",
        contrastText: "#ffffff",
      },
      secondary: {
        main: darkMode ? "#616161" : "#9c27b0",
      },
      background: {
        default: darkMode ? "#121212" : "#ffffff",
        paper: darkMode ? "#1e1e1e" : "#f5f5f5",
      },
      text: {
        primary: darkMode ? "#ffffff" : "#nnnnnn", // Biały dla ciemnego motywu, domyślny w jasnym
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: darkMode ? "#ffffff" : "#nnnnnn", // Automatyczny kolor tekstu
            "&:hover": {
              backgroundColor: "transparent", // Wyłączenie hover
            },
            textTransform: "none",
            borderRadius: "8px",
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            color: darkMode ? "#ffffff" : "inherit", // Kolor tekstu globalnie
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: darkMode ? "#ffffff" : "inherit", // Kolor dla komponentu Typography
          },
        },
      },
    },
  });

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header darkMode={darkMode} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
