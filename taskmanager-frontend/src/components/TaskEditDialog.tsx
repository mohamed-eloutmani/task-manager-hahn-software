import { useEffect, useState } from "react";
import type { TaskDto, TaskStatus } from "../types/dto";
import { updateTask } from "../api/tasks";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  MenuItem,
} from "@mui/material";

type Props = {
  open: boolean;
  task: TaskDto;
  onClose: () => void;
  onSaved: () => void;
};

export default function TaskEditDialog({
  open,
  task,
  onClose,
  onSaved,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<string | undefined>();
  const [status, setStatus] = useState<TaskStatus>("TODO");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setTitle(task.title);
      setDescription(task.description ?? "");
      setDueDate(task.dueDate);
      setStatus(task.status);
    }
  }, [open, task]);

  const handleSave = async () => {
    setSaving(true);

    await updateTask(task.id, {
      title,
      description,
      dueDate,
      status,
    });

    setSaving(false);
    onClose();
    onSaved();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Task Details</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Title"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            minRows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <TextField
            label="Due Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={dueDate ?? ""}
            onChange={(e) =>
              setDueDate(e.target.value || undefined)
            }
          />

          {/* 🔥 REAL TASK PROGRESSION */}
          <TextField
            select
            label="Task Status"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as TaskStatus)
            }
          >
            <MenuItem value="TODO">To Do</MenuItem>
            <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
            <MenuItem value="DONE">Done</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!title || saving}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
