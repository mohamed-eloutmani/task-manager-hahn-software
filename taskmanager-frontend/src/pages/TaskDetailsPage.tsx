import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTaskById, deleteTask } from "../api/tasks";
import type { TaskDto } from "../types/dto";

import {
  Box,
  Typography,
  Chip,
  Stack,
  IconButton,
  Card,
  CardContent,
  Divider,
  Button,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";

import TaskEditDialog from "../components/TaskEditDialog";
import ConfirmDialog from "../components/ConfirmDialog";

export default function TaskDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState<TaskDto | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const loadTask = () => {
    if (id) {
      getTaskById(Number(id)).then(setTask);
    }
  };

  useEffect(() => {
    loadTask();
  }, [id]);

  if (!task) return null;

  return (
    <Box maxWidth={800} mx="auto">
      {/* ===== BACK ===== */}
      <IconButton onClick={() => navigate("/tasks")} sx={{ mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>

      <Card>
        <CardContent>
          <Stack spacing={2}>
            {/* ===== TITLE + ACTIONS ===== */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h4">
                {task.title}
              </Typography>

              <Stack direction="row" spacing={1}>
                <IconButton onClick={() => setOpenEdit(true)}>
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => setConfirmDelete(true)}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Stack>

            {/* ===== PROJECT ===== */}
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ cursor: "pointer" }}
              onClick={() =>
                navigate(`/projects/${task.projectId}`)
              }
            >
              <FolderIcon color="primary" />
              <Typography variant="body2" color="primary">
                {task.projectTitle}
              </Typography>
            </Stack>

            <Divider />

            {/* ===== DESCRIPTION ===== */}
            {task.description ? (
              <Typography color="text.secondary">
                {task.description}
              </Typography>
            ) : (
              <Typography
                color="text.secondary"
                fontStyle="italic"
              >
                No description provided.
              </Typography>
            )}

            {/* ===== STATUS ===== */}
            <Chip
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

      {/* ===== EDIT DIALOG ===== */}
      <TaskEditDialog
        open={openEdit}
        task={task}
        onClose={() => setOpenEdit(false)}
        onSaved={() => {
          setOpenEdit(false);
          loadTask();
        }}
      />

      {/* ===== DELETE CONFIRMATION ===== */}
      <ConfirmDialog
        open={confirmDelete}
        title="Delete Task"
        message={`Delete "${task.title}" ?`}
        onCancel={() => setConfirmDelete(false)}
        onConfirm={async () => {
          await deleteTask(task.id);
          navigate("/tasks");
        }}
      />
    </Box>
  );
}
