import { api } from "./axios";
import type { TaskDto, UpdateTaskDto } from "../types/dto";

// ======================================================
// GET TASKS BY PROJECT
// GET /api/tasks/project/{projectId}
// ======================================================
export async function getTasks(projectId: number): Promise<TaskDto[]> {
  const res = await api.get<TaskDto[]>(
    `/api/tasks/project/${projectId}`
  );
  return res.data;
}

// ======================================================
// CREATE TASK (FOR PROJECT)
// POST /api/tasks/project/{projectId}
// ======================================================
export async function createTask(
  projectId: number,
  data: {
    title: string;
    description?: string;
    dueDate?: string;
  }
): Promise<TaskDto> {
  const res = await api.post<TaskDto>(
    `/api/tasks/project/${projectId}`,
    data
  );
  return res.data;
}

// ======================================================
// UPDATE TASK
// PUT /api/tasks/{id}
// ======================================================
export async function updateTask(
  id: number,
  data: UpdateTaskDto
): Promise<TaskDto> {
  const res = await api.put<TaskDto>(
    `/api/tasks/${id}`,
    data
  );
  return res.data;
}

// ======================================================
// DELETE TASK
// DELETE /api/tasks/{id}
// ======================================================
export async function deleteTask(id: number): Promise<void> {
  await api.delete(`/api/tasks/${id}`);
}

// ======================================================
// GET ALL TASKS (GLOBAL)
// GET /api/tasks
// ======================================================
export async function getAllTasks(): Promise<TaskDto[]> {
  const res = await api.get<TaskDto[]>("/api/tasks");
  return res.data;
}

// ======================================================
// GET TASK BY ID
// GET /api/tasks/{id}
// ======================================================
export async function getTaskById(id: number): Promise<TaskDto> {
  const res = await api.get<TaskDto>(`/api/tasks/${id}`);
  return res.data;
}
