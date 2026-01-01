export type Task = {
  id: number;
  title: string;
  description?: string | null;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export async function getTasks(): Promise<Task[]> {
  const res = await fetch("/api/tasks");
  return res.json();
}

export async function createTask(title: string): Promise<Task> {
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
}

export async function updateTask(id: number, data: Partial<Task>): Promise<Task> {
  const res = await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteTask(id: number): Promise<Task> {
  const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  return res.json();
}
