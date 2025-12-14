import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTasks } from "../api/tasks";
import type { TaskDto, TaskStatus } from "../types/dto";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from "@mui/material";

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "ALL">("ALL");
  const navigate = useNavigate();

  useEffect(() => {
    getAllTasks().then(setTasks);
  }, []);

  // ===== FILTER =====
  const filteredTasks =
    statusFilter === "ALL"
      ? tasks
      : tasks.filter((t) => t.status === statusFilter);

  // ===== GROUP BY PROJECT =====
  const grouped = filteredTasks.reduce((acc, task) => {
    acc[task.projectTitle] ||= [];
    acc[task.projectTitle].push(task);
    return acc;
  }, {} as Record<string, TaskDto[]>);

  return (
    <Box maxWidth={900} mx="auto">
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h4">All Tasks</Typography>

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as any)
            }
          >
            <MenuItem value="ALL">All</MenuItem>
            <MenuItem value="TODO">To Do</MenuItem>
            <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
            <MenuItem value="DONE">Done</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {Object.keys(grouped).length === 0 && (
        <Typography color="text.secondary">
          No tasks found.
        </Typography>
      )}

      {Object.entries(grouped).map(([project, tasks]) => (
        <Box key={project} mb={4}>
          <Typography variant="h6" color="primary" mb={1}>
            {project}
          </Typography>

          <Divider sx={{ mb: 2 }} />

          {tasks.map((task) => (
            <Card
              key={task.id}
              sx={{ mb: 2, cursor: "pointer" }}
              onClick={() => navigate(`/tasks/${task.id}`)}
            >
              <CardContent>
                <Stack spacing={1}>
                  <Typography fontWeight={500}>
                    {task.title}
                  </Typography>

                  <Chip
                    size="small"
                    label={
                      task.status === "TODO"
                        ? "To Do"
                        : task.status === "IN_PROGRESS"
                        ? "In Progress"
                        : "Done"
                    }
                    color={
                      task.status === "DONE"
                        ? "success"
                        : task.status === "IN_PROGRESS"
                        ? "info"
                        : "default"
                    }
                  />
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      ))}
    </Box>
  );
}
