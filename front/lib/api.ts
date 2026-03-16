import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000",
  withCredentials: true,
});

export type Step = {
  id: string;
  title: string;
  description: string;
  done: boolean;
};

export type Task = {
  id: string;
  title: string;
  prompt: string;
  date: string;
  steps: Step[];
};

export type CalendarMonthResponse = {
  year: number;
  month: number;
  days: Record<string, number>;
};

export type HistoryResponse = {
  tasks: Task[];
  total: number;
  page: number;
  totalPages: number;
};

export function createTask(prompt: string, date?: string) {
  return api.post<Task>("/tasks", { prompt, date });
}

export function fetchTasksForDate(date: string) {
  return api.get<Task[]>('/tasks/calendar', { params: { date } });
}

export function fetchCalendarMonth(year: number, month: number) {
  return api.get<CalendarMonthResponse>("/tasks/calendar/month", {
    params: { year, month },
  });
}

export function fetchHistory(page = 1, limit = 10) {
  return api.get<HistoryResponse>("/tasks/history", {
    params: { page, limit },
  });
}

export function toggleStepDone(taskId: string, stepId: string, done: boolean) {
  return api.patch<Step>(`/tasks/${taskId}/steps/${stepId}`, { done });
}

export function deleteTask(taskId: string) {
  return api.delete<{ message: string }>(`/tasks/${taskId}`);
}
