import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  List,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Collapse,
} from "@mui/material";
import ClearAllIcon from "@mui/icons-material/DeleteSweep";
import TodoItem from "@VS/componnets/ToDoItem";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
}

type FilterType = "all" | "active" | "completed";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [snackbar, setSnackbar] = useState<{ message: string; severity: "success" | "info" | "error" } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) setTodos(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
    }, 300);
    return () => clearTimeout(handler);
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) {
      setSnackbar({ message: "Task cannot be empty", severity: "error" });
      return;
    }
    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      createdAt: new Date().toLocaleString(),
    };
    setTodos((prev) => [newTodo, ...prev]);
    setInput("");
    setSnackbar({ message: "Task added", severity: "success" });
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    setSnackbar({ message: "Task deleted", severity: "info" });
  };

  const updateTodo = (id: number, text: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
    setSnackbar({ message: "Task updated", severity: "success" });
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
    setSnackbar({ message: "Completed tasks cleared", severity: "info" });
  };

  const filteredTodos = useMemo(
    () =>
      todos.filter((todo) =>
        filter === "active"
          ? !todo.completed
          : filter === "completed"
          ? todo.completed
          : true
      ),
    [todos, filter]
  );

  return (
    <>
      <Head>
        <title>To-Do App</title>
      </Head>

      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          background: "linear-gradient(135deg, #8e2de2, #4a00e0)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: 500, md: 600 },
            height: { xs: "auto", sm: 800 },
            display: "flex",
            flexDirection: "column",
            p: { xs: 3, sm: 4 },
            borderRadius: 4,
            background: "linear-gradient(135deg, #ffffff, #f3e5f5)",
            backdropFilter: "blur(6px)",
            boxShadow: "0 12px 30px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            gutterBottom
            sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
          >
            My To-Do List
          </Typography>

          <Stack direction="row" spacing={2} mb={2}>
            <TextField
              size="small"
              fullWidth
              label="New task"
              placeholder="e.g., Finish React project"
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
            />
            <Button variant="contained" onClick={addTodo}>
              Add
            </Button>
          </Stack>

          <Tabs
            value={filter}
            onChange={(_, value) => setFilter(value)}
            centered
            sx={{ mb: 1 }}
          >
            <Tab label="All" value="all" />
            <Tab label="Active" value="active" />
            <Tab label="Completed" value="completed" />
          </Tabs>

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              pr: 1,
              mt: 1,
              mb: 2,
              maxHeight: { xs: "60vh", sm: "500px" }, // 👈 better for mobile
            }}
          >
            <List>
              {filteredTodos.length === 0 ? (
                <Typography align="center" color="text.secondary">
                  No tasks to show.
                </Typography>
              ) : (
                filteredTodos.map((todo) => (
                  <Collapse in key={todo.id}>
                    <TodoItem
                      todo={todo}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                      onEdit={updateTodo}
                    />
                  </Collapse>
                ))
              )}
            </List>
          </Box>


          <Box display="flex" justifyContent="space-between" mt="auto">
            <Typography variant="body2" color="text.secondary">
              {todos.filter((t) => !t.completed).length} task(s) remaining
            </Typography>
            <IconButton
              onClick={clearCompleted}
              title="Clear completed tasks"
              disabled={todos.every((t) => !t.completed)}
            >
              <ClearAllIcon />
            </IconButton>
          </Box>
        </Paper>
      </Box>

      {/* Snackbar */}
      {snackbar && (
        <Snackbar
          open
          autoHideDuration={2500}
          onClose={() => setSnackbar(null)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={snackbar.severity} onClose={() => setSnackbar(null)}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
