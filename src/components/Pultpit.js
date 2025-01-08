import React from "react";
import { Typography, Box, Grid, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ExpensesWidget from "./ExpensesWidget";
import GoalsWidget from "./GoalsWidget";
import IncomeWidget from "./IncomeWidget"; // Import nowego widgetu

function Pulpit() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isLoggedIn = Boolean(user && user.firstName); // Sprawdzenie, czy użytkownik jest zalogowany
  const userName = user.firstName || "Użytkowniku";
  const currentBalance = 3500; // Przykładowy balans konta

  return (
    <Box
      style={{
        height: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        padding: "16px",
      }}
    >
      {/* Powitanie lub komunikat zachęcający do logowania */}
      <Box style={{ textAlign: "center", marginBottom: "16px" }}>
        {isLoggedIn ? (
          <Typography variant="h4" color="primary">
            Witaj ponownie, {userName}!
          </Typography>
        ) : (
          <>
            <Typography variant="h4" color="primary" gutterBottom>
              Witaj w Finance Tracker!
            </Typography>
            <Typography variant="body1" style={{ marginBottom: "16px" }}>
              Nasz serwis pomaga Ci monitorować wydatki, oszczędności oraz
              przychody, abyś mógł lepiej zarządzać swoim budżetem. Zaloguj się
              i zacznij śledzić swoje finanse już teraz!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/login")}
              sx={{ marginRight: "8px" }}
            >
              Zaloguj się
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/register")}
            >
              Zarejestruj się
            </Button>
          </>
        )}
      </Box>

      {/* Sekcja dla zalogowanego użytkownika */}
      {isLoggedIn && (
        <>
          {/* Sekcja Balansu */}
          <Grid container spacing={2} style={{ marginBottom: "16px" }}>
            <Grid item xs={12}>
              <Paper style={{ padding: "16px", textAlign: "center" }}>
                <Typography variant="subtitle1">
                  Twój aktualny balans
                </Typography>
                <Typography variant="h5">{currentBalance} PLN</Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Sekcja Widgetów */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <ExpensesWidget />
            </Grid>
            <Grid item xs={12} md={6}>
              <IncomeWidget />
            </Grid>
            <Grid item xs={12} md={6}>
              <GoalsWidget />
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
}

export default Pulpit;
