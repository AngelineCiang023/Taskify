"use client";

import useSWR from "swr";

type Task = {
  id: number;
  status: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: string | null;
};

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useTaskSummary() {
  const { data: tasks = [], isLoading } = useSWR<Task[]>("/api/tasks", fetcher);

  const total = tasks.length;
  const completed = tasks.filter(t => t.status).length;
  const pending = total - completed;

  const overdue = tasks.filter(
    t => t.dueDate && !t.status && new Date(t.dueDate) < new Date()
  ).length;

  const progress =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return {
    isLoading,
    total,
    completed,
    pending,
    overdue,
    progress,
  };
}
