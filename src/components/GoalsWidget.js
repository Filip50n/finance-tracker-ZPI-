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
  LinearProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function GoalsWidget() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id || 1;

  const [goals, setGoals] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAddSavingsDialog, setOpenAddSavingsDialog] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [newGoal, setNewGoal] = useState({ targetAmount: "" });
  const [savingsAmount, setSavingsAmount] = useState("");

  // Symulacja pobierania celów
  const fetchGoals = async () => {
    const mockResponse = [
      {
        id: 1,
        user: { id: userId },
        targetAmount: 5000,
        savedAmount: 1500,
        progressPercentage: 30.0,
      },
      {
        id: 2,
        user: { id: userId },
        targetAmount: 10000,
        savedAmount: 4000,
        progressPercentage: 40.0,
      },
    ];
    setGoals(mockResponse);
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  // Dodanie nowego celu
  const handleAddGoal = () => {
    const newGoalData = {
      id: goals.length + 1,
      user: { id: userId },
      targetAmount: Number(newGoal.targetAmount),
      savedAmount: 0,
      progressPercentage: 0,
    };

    setGoals([...goals, newGoalData]);
    setNewGoal({ targetAmount: "" });
    setOpen(false);
    alert("Cel został dodany!");
  };

  // Dodanie oszczędności do celu
  const handleAddSavings = () => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === selectedGoal.id
          ? {
              ...goal,
              savedAmount: goal.savedAmount + Number(savingsAmount),
              progressPercentage: Math.min(
                ((goal.savedAmount + Number(savingsAmount)) /
                  goal.targetAmount) *
                  100,
                100
              ),
            }
          : goal
      )
    );
    setSavingsAmount("");
    setOpenAddSavingsDialog(false);
    alert("Oszczędności zostały dodane!");
  };

  // Usunięcie celu
  const handleDeleteGoal = (goalId) => {
    setGoals(goals.filter((goal) => goal.id !== goalId));
    alert("Cel został usunięty!");
  };

  return (
    <Paper sx={{ padding: 2, margin: 2 }}>
      {/* Nagłówek */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Twoje Cele Oszczędnościowe</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Dodaj Cel
        </Button>
      </Box>

      {/* Tabela Celów */}
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Cel (Kwota Docelowa)</TableCell>
              <TableCell>Zaoszczędzono</TableCell>
              <TableCell>Procent Postępu</TableCell>
              <TableCell align="right">Akcje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {goals.map((goal) => (
              <TableRow key={goal.id}>
                <TableCell>{goal.targetAmount} PLN</TableCell>
                <TableCell>{goal.savedAmount} PLN</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <LinearProgress
                      variant="determinate"
                      value={goal.progressPercentage}
                      sx={{ width: "100%", marginRight: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {goal.progressPercentage}%
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        setSelectedGoal(goal);
                        setOpenAddSavingsDialog(true);
                      }}
                    >
                      Dodaj Oszczędności
                    </Button>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteGoal(goal.id)}
                      sx={{ marginLeft: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog Dodawania Nowego Celu */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Dodaj Nowy Cel</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Kwota Docelowa"
            type="number"
            fullWidth
            value={newGoal.targetAmount}
            onChange={(e) => setNewGoal({ targetAmount: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={() => setOpen(false)}>
            Anuluj
          </Button>
          <Button color="primary" onClick={handleAddGoal}>
            Dodaj
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Dodawania Oszczędności */}
      <Dialog
        open={openAddSavingsDialog}
        onClose={() => setOpenAddSavingsDialog(false)}
      >
        <DialogTitle>Dodaj Oszczędności</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Kwota Oszczędności"
            type="number"
            fullWidth
            value={savingsAmount}
            onChange={(e) => setSavingsAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={() => setOpenAddSavingsDialog(false)}
          >
            Anuluj
          </Button>
          <Button color="primary" onClick={handleAddSavings}>
            Dodaj
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default GoalsWidget;
