import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemText,
  TextField,
  Box,
  Tooltip,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Check";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { Todo } from "@VS/pages";

interface Props {
  todo: Todo
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isMobile = useMediaQuery("(max-width:600px)");
  const openMenu = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

  const handleEditClick = () => {
    setEditing(true);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    onDelete(todo.id);
    handleMenuClose();
  };

  const handleSave = () => {
    if (editedText.trim()) {
      onEdit(todo.id, editedText.trim());
      setEditing(false);
    }
  };

  const displayText = isMobile
    ? todo.text.length > 25
      ? todo.text.slice(0, 25) + "..."
      : todo.text
    : todo.text;

  return (
    <ListItem
      divider
      alignItems="flex-start"
      sx={{
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        gap: 1,
      }}
      secondaryAction={
        editing ? (
          <IconButton onClick={handleSave}>
            <SaveIcon />
          </IconButton>
        ) : isMobile ? (
          <>
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
              <MenuItem onClick={handleEditClick}>
                <EditIcon fontSize="small" sx={{ mr: 1 }} /> Edit
              </MenuItem>
              <MenuItem onClick={handleDeleteClick}>
                <DeleteIcon fontSize="small" sx={{ mr: 1 }} /> Delete
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <IconButton onClick={() => setEditing(true)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" onClick={() => onDelete(todo.id)}>
              <DeleteIcon />
            </IconButton>
          </>
        )
      }
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
        <Checkbox
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          sx={{ mt: 0.5 }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {editing ? (
            <TextField
              fullWidth
              variant="standard"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
          ) : (
            <Tooltip title={todo.text} placement="top-start">
              <ListItemText
                primary={displayText}
                secondary={`Created: ${todo.createdAt}`}
                sx={{
                  wordBreak: "break-word",
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "text.secondary" : "text.primary",
                }}
              />
            </Tooltip>
          )}
        </Box>
      </Box>
    </ListItem>
  );
}
