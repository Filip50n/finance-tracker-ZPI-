import React, { useState } from "react";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Do przekierowania użytkownika

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setError("");
    setSuccess("");

    // Symulacja "mockowania" odpowiedzi API
    console.log("Wysłane dane:", formData);

    try {
      // Zakładamy, że rejestracja się udała
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(formData));
      setSuccess("Rejestracja zakończona sukcesem!");

      // Przekierowanie na stronę główną po 1.5 sekundy
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError("Wystąpił błąd rejestracji. Spróbuj ponownie.");
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
          Rejestracja
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <TextField
          label="Imię"
          name="firstName"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          label="Nazwisko"
          name="lastName"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Hasło"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={handleSubmit}
        >
          Zarejestruj się
        </Button>
      </Box>
    </Box>
  );
}

export default Register;
