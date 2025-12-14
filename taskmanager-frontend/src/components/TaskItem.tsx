import { useState } from "react";
import type { TaskDto } from "../types/dto";

import {
  Card,
  Typography,
  Stack,
  Chip,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import ConfirmDialog from "./ConfirmDialog";
import TaskEditDialog from "./TaskEditDialog";
import { deleteTask } from "../api/tasks";
import { useToast } from "./ToastContext";

type Props = {
  task: TaskDto;
  onUpdated: () => void;
};

export default function TaskItem({ task, onUpdated }: Props) {
  const [openEdit, setOpenEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { showToast } = useToast();

  const statusColor =
    task.status === "DONE"
      ? "success"
      : task.status === "IN_PROGRESS"
      ? "info"
      : "default";

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          mb: 1,
          p: 2,
          cursor: "pointer",
          "&:hover": { boxShadow: 2 },
        }}
        onClick={() => setOpenEdit(true)}
      >
        <Stack spacing={1}>
          <Typography fontWeight={500}>{task.title}</Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              size="small"
              label={
                task.status === "TODO"
                  ? "To Do"
                  : task.status === "IN_PROGRESS"
                  ? "In Progress"
                  : "Done"
              }
              color={statusColor}
            />

            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setOpenEdit(true);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                setConfirmDelete(true);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Card>

      {/* ===== Edit Dialog ===== */}
      <TaskEditDialog
        open={openEdit}
        task={task}
        onClose={() => setOpenEdit(false)}
        onSaved={() => {
          setOpenEdit(false);
          showToast("Task updated successfully");
          onUpdated();
        }}
      />

      {/* ===== Delete Confirmation ===== */}
      <ConfirmDialog
        open={confirmDelete}
        title="Delete Task"
        message={`Delete "${task.title}" ?`}
        onCancel={() => setConfirmDelete(false)}
        onConfirm={async () => {
          try {
            await deleteTask(task.id);
            showToast("Task deleted", "info");
            setConfirmDelete(false);
            onUpdated();
          } catch (err) {
            showToast("Failed to delete task", "error");
          }
        }}
      />
    </>
  );
}
