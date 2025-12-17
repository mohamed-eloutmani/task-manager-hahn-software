import { useState } from "react";
import { createTask } from "../api/tasks";

import {
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Typography,
} from "@mui/material";

type Props = {
  projectId: number;
  onCreated: () => void;
};

export default function CreateTaskForm({ projectId, onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const today = new Date().toISOString().split("T")[0];
    if (dueDate && dueDate < today) {
      alert("Due date must be today or in the future");
      return;
    }

    setLoading(true);

    await createTask(projectId, {
      title,
      description: description || undefined,
      dueDate,
    });

    setTitle("");
    setDescription("");
    setDueDate(undefined);
    setLoading(false);
    onCreated();
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          New Task
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Title"
              required
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              label="Description"
              fullWidth
              multiline
              minRows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <TextField
              label="Due Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: new Date().toISOString().split("T")[0], //  blocks past dates
              }}
              value={dueDate ?? ""}
              onChange={(e) =>
                setDueDate(e.target.value || undefined)
              }
            />

            <Stack direction="row" justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                disabled={!title || loading}
              >
                Add Task
              </Button>
            </Stack>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}
