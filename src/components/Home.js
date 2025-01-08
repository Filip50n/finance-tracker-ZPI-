import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Pulpit from "./Pultpit";

function Home() {
  // Sprawdź, czy użytkownik jest zalogowany (mock)
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <>
      {isLoggedIn ? (
        // Wyświetl pulpit dla zalogowanego użytkownika
        <Pulpit />
      ) : (
        // Wyświetl stronę powitalną dla niezalogowanego użytkownika
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="calc(100vh - 64px)"
          textAlign="center"
        >
          <Typography variant="h3" component="h1" gutterBottom color="primary">
            Witaj w naszym serwisie!
          </Typography>
          <Typography variant="h6" gutterBottom>
            Nasza usługa to zaawansowane narzędzie do zarządzania finansami
            osobistymi.
          </Typography>
          <Typography variant="body1" paragraph>
            Monitoruj swoje wydatki, planuj budżet i oszczędzaj z łatwością.
            Dołącz już teraz i zyskaj pełną kontrolę nad swoimi finansami!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            href="/login"
          >
            Zaloguj się
          </Button>
        </Box>
      )}
    </>
  );
}

export default Home;
