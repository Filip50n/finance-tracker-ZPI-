import React, { useState } from "react";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Mockowane dane użytkowników
  const mockUsers = [
    { email: "test@example.com", password: "123456", firstName: "Test", id: 1 },
    {
      email: "john@example.com",
      password: "password",
      firstName: "John",
      id: 2,
    },
  ];

  const handleLogin = () => {
    // Wyszukaj użytkownika w mockowanych danych
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // Zapisz użytkownika w localStorage
      localStorage.setItem("user", JSON.stringify(user));
      setError("");
      alert("Zalogowano pomyślnie!");
      window.location.href = "/"; // Przekierowanie na stronę główną
    } else {
      setError("Nieprawidłowy email lub hasło. Spróbuj ponownie.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 64px)",
        paddingTop: "64px",
        marginTop: "-130px",
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: "100%",
          padding: 2,
          textAlign: "center",
          borderRadius: 2,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Logowanie
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            style: { color: "#e0e0e0" },
          }}
        />
        <TextField
          label="Hasło"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            style: { color: "#e0e0e0" },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            marginTop: 2,
          }}
          onClick={handleLogin}
        >
          Zaloguj się
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
