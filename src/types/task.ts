export type TaskStatus = "Pendiente" | "En gestión" | "Finalizada";

export interface TaskFollowUp {
  id: string;
  date: string;
  comment: string;
}

export interface Task {
  id: string;
  name: string;
  theme: string;
  activity: string;
  priority: number;
  status: TaskStatus;
  responsible: string;
  deadline?: string;
  description?: string;
  followUps: TaskFollowUp[];
}

export interface TaskFilters {
  theme: string;
  activity: string;
  priority: string;
  status: string;
  responsible: string;
}
