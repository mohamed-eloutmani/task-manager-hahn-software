import { api } from "./axios";
import type { ProjectDto, ProjectProgressDto } from "../types/dto";

export type Project = ProjectDto;

// ================== GET ALL ==================
export async function getProjects(): Promise<Project[]> {
  const res = await api.get<Project[]>("/api/projects");
  return res.data;
}

// ================== GET ONE ==================
export async function getProjectById(id: number): Promise<Project> {
  const res = await api.get<Project>(`/api/projects/${id}`);
  return res.data;
}

// ================== CREATE ==================
export async function createProject(data: {
  title: string;
  description?: string;
}): Promise<Project> {
  const res = await api.post<Project>("/api/projects", data);
  return res.data;
}

// ================== DELETE ==================
export async function deleteProject(id: number): Promise<void> {
  await api.delete(`/api/projects/${id}`);
}

// ================== PROGRESS ==================
export async function getProjectProgress(
  id: number
): Promise<ProjectProgressDto> {
  const res = await api.get<ProjectProgressDto>(
    `/api/projects/${id}/progress`
  );
  return res.data;
}
