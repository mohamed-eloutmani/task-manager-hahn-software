import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getTasks } from "../api/tasks";
import {
  getProjectProgress,
  getProjectById,
  deleteProject,
} from "../api/projects";

import type {
  TaskDto,
  ProjectProgressDto,
  ProjectDto,
} from "../types/dto";

import {
  Typography,
  LinearProgress,
  Card,
  CardContent,
  Box,
  Divider,
  Button,
  Stack,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import CreateTaskForm from "../components/CreateTaskForm";
import ConfirmDialog from "../components/ConfirmDialog";
import TaskItem from "../components/TaskItem";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const projectId = Number(id);

  const [project, setProject] = useState<ProjectDto | null>(null);
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [progress, setProgress] =
    useState<ProjectProgressDto | null>(null);

  const [confirmDeleteProject, setConfirmDeleteProject] =
    useState(false);

  // 🚑 INVALID URL → go back safely
  useEffect(() => {
    if (isNaN(projectId)) {
      navigate("/projects", { replace: true });
    }
  }, [projectId]);

  const load = async () => {
    try {
      const p = await getProjectById(projectId);

      if (!p) {
        navigate("/projects", { replace: true });
        return;
      }

      setProject(p);
      setTasks(await getTasks(projectId));
      setProgress(await getProjectProgress(projectId));
    } catch {
      navigate("/projects", { replace: true });
    }
  };

  useEffect(() => {
    load();
  }, []);

  // ⏳ Wait until project is loaded
  if (!project) return null;

  return (
    <Box maxWidth={900} mx="auto">
      {/* ===== Header ===== */}
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <IconButton onClick={() => navigate("/projects")}>
          <ArrowBackIcon />
        </IconButton>

        <Box flexGrow={1}>
          <Typography variant="h4">{project.title}</Typography>
          {project.description && (
            <Typography color="text.secondary">
              {project.description}
            </Typography>
          )}
        </Box>

        <Button
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => setConfirmDeleteProject(true)}
        >
          Delete Project
        </Button>
      </Stack>

      {/* ===== Progress ===== */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Progress
          </Typography>

          {progress && (
            <>
              <Stack
                direction="row"
                justifyContent="space-between"
                mb={1}
              >
                <Typography variant="body2">
                  {progress.completedTasks} /{" "}
                  {progress.totalTasks} tasks done
                </Typography>
                <Typography variant="body2">
                  {Math.round(progress.progressPercentage)}%
                </Typography>
              </Stack>

              <LinearProgress
                variant="determinate"
                value={progress.progressPercentage}
              />
            </>
          )}
        </CardContent>
      </Card>

      {/* ===== Create Task ===== */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Add a Task
          </Typography>
          <CreateTaskForm
            projectId={projectId}
            onCreated={load}
          />
        </CardContent>
      </Card>

      {/* ===== Tasks ===== */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Tasks
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {tasks.length === 0 && (
            <Typography color="text.secondary">
              No tasks yet. Start by adding one 👆
            </Typography>
          )}

          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdated={load}
            />
          ))}
        </CardContent>
      </Card>

      {/* ===== Delete Project Confirmation ===== */}
      <ConfirmDialog
        open={confirmDeleteProject}
        title="Delete Project"
        message={`Delete project "${project.title}" ?`}
        onCancel={() => setConfirmDeleteProject(false)}
        onConfirm={async () => {
          await deleteProject(projectId);
          navigate("/projects", { replace: true });
        }}
      />
    </Box>
  );
}
