import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

function ExpensesWidget() {
  const theme = useTheme();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id || 1;

  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [expenseData, setExpenseData] = useState({
    amount: "",
    category: "",
    date: "",
  });
  const [newCategory, setNewCategory] = useState("");

  // Pobieranie wydatków (mock)
  const fetchExpenses = async () => {
    const response = [
      {
        id: 1,
        user: { id: userId },
        amount: 100,
        category: { name: "Transport" },
        date: "2024-06-15",
      },
      {
        id: 2,
        user: { id: userId },
        amount: 200,
        category: { name: "Jedzenie" },
        date: "2024-06-16",
      },
    ];
    setExpenses(response);
  };

  // Pobieranie kategorii (mock)
  const fetchCategories = async () => {
    const response = [
      { id: 1, name: "Jedzenie" },
      { id: 2, name: "Transport" },
      { id: 3, name: "Rozrywka" },
    ];
    setCategories(response);
  };

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  // Dodawanie nowego wydatku
  const handleSubmit = () => {
    const selectedCategory = categories.find(
      (category) => category.id === Number(expenseData.category)
    );

    const newExpense = {
      id: expenses.length + 1,
      user: { id: userId },
      amount: Number(expenseData.amount),
      category: { name: selectedCategory.name },
      date: expenseData.date,
    };

    setExpenses([...expenses, newExpense]);
    setExpenseData({ amount: "", category: "", date: "" });
    setOpen(false);
  };

  // Usuwanie kategorii
  const handleDeleteCategory = async (id) => {
    try {
      // Symulacja żądania DELETE do API
      console.log(`Rozpoczęto usuwanie kategorii o ID: ${id}`);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Symulacja opóźnienia sieciowego

      // Po „udanym” usunięciu kategorii zaktualizuj lokalny stan
      setCategories(categories.filter((category) => category.id !== id));
      setExpenses(expenses.filter((expense) => expense.category.id !== id)); // Opcjonalnie, usuń wydatki związane z kategorią
      alert("Kategoria została usunięta.");
    } catch (error) {
      console.error("Błąd podczas usuwania kategorii:", error);
      alert("Nie udało się usunąć kategorii.");
    }
  };

  // Dodawanie nowej kategorii
  const handleAddCategory = async () => {
    const response = { id: categories.length + 1, name: newCategory }; // Mock POST
    setCategories([...categories, response]);
    setNewCategory("");
    setOpenCategoryDialog(false);
    alert("Kategoria została dodana.");
  };

  return (
    <Paper sx={{ padding: 2, margin: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Twoje Wydatki</Typography>
        <AddCircleIcon
          color="primary"
          sx={{ fontSize: 40, cursor: "pointer" }}
          onClick={() => setOpen(true)}
        />
      </Box>

      {/* Wykres kołowy */}
      <Box display="flex" justifyContent="center" mb={2}>
        <PieChart width={400} height={300}>
          <Pie
            data={expenses.map((e) => ({
              name: e.category.name,
              value: e.amount,
            }))}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {expenses.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={["#0088FE", "#00C49F", "#FFBB28"][index % 3]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Box>

      {/* Tabela wydatków */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Lista Wydatków
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Data</TableCell>
                <TableCell>Kategoria</TableCell>
                <TableCell align="right">Kwota (PLN)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.category.name}</TableCell>
                  <TableCell align="right">{expense.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Dialog z formularzem */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Dodaj nowy wydatek</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Kwota"
            name="amount"
            type="number"
            fullWidth
            value={expenseData.amount}
            onChange={(e) =>
              setExpenseData({ ...expenseData, amount: e.target.value })
            }
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Kategoria</InputLabel>
            <Select
              value={expenseData.category}
              onChange={(e) =>
                setExpenseData({ ...expenseData, category: e.target.value })
              }
              label="Kategoria"
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                  >
                    {category.name}
                    <IconButton
                      size="small"
                      color="error"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDeleteCategory(category.id);
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography
            variant="body2"
            color="primary"
            sx={{ cursor: "pointer", marginTop: "8px" }}
            onClick={() => setOpenCategoryDialog(true)}
          >
            Dodaj nową kategorię
          </Typography>
          <TextField
            margin="dense"
            label="Data"
            name="date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={expenseData.date}
            onChange={(e) =>
              setExpenseData({ ...expenseData, date: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Anuluj</Button>
          <Button onClick={handleSubmit}>Dodaj</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog dodawania nowej kategorii */}
      <Dialog
        open={openCategoryDialog}
        onClose={() => setOpenCategoryDialog(false)}
      >
        <DialogTitle>Dodaj nową kategorię</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nazwa kategorii"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCategoryDialog(false)}>Anuluj</Button>
          <Button onClick={handleAddCategory}>Dodaj</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default ExpensesWidget;
