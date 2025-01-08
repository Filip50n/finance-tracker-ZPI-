import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function IncomeWidget() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id || 1;

  const [incomes, setIncomes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newIncome, setNewIncome] = useState({
    amount: "",
    frequency: "monthly",
    isFixed: false,
    startDate: "",
  });
  const [chartData, setChartData] = useState([]);
  const [showChart, setShowChart] = useState(false);

  // Symulacja pobierania przychodów z API
  const fetchIncomes = async () => {
    const mockResponse = [
      {
        id: 1,
        user: { id: userId },
        amount: 5000.0,
        frequency: "monthly",
        isFixed: true,
        startDate: "2024-06-01",
      },
      {
        id: 2,
        user: { id: userId },
        amount: 300.0,
        frequency: "weekly",
        isFixed: false,
        startDate: "2024-06-05",
      },
    ];
    setIncomes(mockResponse);
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  // Dodawanie nowego przychodu
  const handleAddIncome = () => {
    const newEntry = {
      id: incomes.length + 1,
      user: { id: userId },
      amount: Number(newIncome.amount),
      frequency: newIncome.frequency,
      isFixed: newIncome.isFixed,
      startDate: newIncome.startDate,
    };
    setIncomes([...incomes, newEntry]);
    setNewIncome({
      amount: "",
      frequency: "monthly",
      isFixed: false,
      startDate: "",
    });
    setOpenDialog(false);
  };

  // Usuwanie przychodu
  const handleDeleteIncome = (id) => {
    setIncomes(incomes.filter((income) => income.id !== id));
    alert("Przychód został usunięty.");
  };

  // Generowanie danych do wykresu
  const simulateEarnings = () => {
    const yearlyIncome = incomes.reduce((total, income) => {
      let annualAmount =
        income.frequency === "monthly"
          ? income.amount * 12
          : income.amount * 52;
      return total + annualAmount;
    }, 0);

    const data = [
      { name: "1 Rok", total: yearlyIncome },
      { name: "2 Lata", total: yearlyIncome * 2 },
      { name: "5 Lat", total: yearlyIncome * 5 },
    ];

    setChartData(data);
    setShowChart(true);
  };

  return (
    <Paper sx={{ padding: 2, margin: 2 }}>
      {/* Nagłówek */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Twoje Przychody</Typography>
        <AddCircleIcon
          color="primary"
          sx={{ fontSize: 40, cursor: "pointer" }}
          onClick={() => setOpenDialog(true)}
        />
      </Box>

      {/* Przycisk symulacji */}
      <Box mb={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={simulateEarnings}>
          Symuluj Zarobki
        </Button>
      </Box>

      {/* Wykres */}
      {showChart && (
        <Box mb={3} height={300}>
          <Typography variant="h6" gutterBottom>
            Symulacja Zarobków
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      )}

      {/* Tabela przychodów */}
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Kwota (PLN)</TableCell>
              <TableCell>Częstotliwość</TableCell>
              <TableCell>Data Rozpoczęcia</TableCell>
              <TableCell>Stałe Wynagrodzenie</TableCell>
              <TableCell align="right">Akcje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incomes.map((income) => (
              <TableRow key={income.id}>
                <TableCell>{income.amount} PLN</TableCell>
                <TableCell>{income.frequency}</TableCell>
                <TableCell>{income.startDate}</TableCell>
                <TableCell>{income.isFixed ? "Tak" : "Nie"}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteIncome(income.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog dodawania przychodu */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Dodaj Nowy Przychód</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Kwota"
            type="number"
            fullWidth
            value={newIncome.amount}
            onChange={(e) =>
              setNewIncome({ ...newIncome, amount: e.target.value })
            }
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Częstotliwość</InputLabel>
            <Select
              value={newIncome.frequency}
              onChange={(e) =>
                setNewIncome({ ...newIncome, frequency: e.target.value })
              }
            >
              <MenuItem value="daily">Dziennie</MenuItem>
              <MenuItem value="weekly">Tygodniowo</MenuItem>
              <MenuItem value="monthly">Miesięcznie</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Data Rozpoczęcia"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newIncome.startDate}
            onChange={(e) =>
              setNewIncome({ ...newIncome, startDate: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Anuluj
          </Button>
          <Button onClick={handleAddIncome} color="primary">
            Dodaj
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default IncomeWidget;
