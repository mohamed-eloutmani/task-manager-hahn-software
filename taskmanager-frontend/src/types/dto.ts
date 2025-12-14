// ================== AUTH ==================
export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

// ================== PROJECT ==================
export type ProjectDto = {
  id: number;
  title: string;
  description?: string;
};

// ================== TASK ==================
export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type TaskDto = {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  status: TaskStatus;
  projectId: number;
  projectTitle: string;
};



// Payload used for updating a task (PUT /api/tasks/{id})
export type UpdateTaskDto = {
  title: string;
  description?: string;
  dueDate?: string;
  status: TaskStatus;
};

// ================== PROGRESS ==================
export type ProjectProgressDto = {
  totalTasks: number;
  completedTasks: number;
  progressPercentage: number;
};
