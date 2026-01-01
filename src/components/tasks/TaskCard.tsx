"use client";

import { useState } from "react";
import { KeyedMutator } from "swr";

type Task = {
  id: number;
  title: string;
  description?: string;
  category?: string | null;
  priority: "low" | "medium" | "high";
  status: boolean;
  dueDate?: string | null;
  created_at: string;
};

export default function TaskCard({
  task,
  mutate,
}: {
  task: Task;
  mutate: KeyedMutator<any>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [category, setCategory] = useState(task.category || "");
  const [priority, setPriority] = useState<"low" | "medium" | "high">(
    task.priority
  );
  const [dueDate, setDueDate] = useState(task.dueDate?.slice(0, 10) || "");

  const isOverdue =
    task.dueDate && !task.status && new Date(task.dueDate) < new Date();

  async function toggleStatus() {
    const res = await fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: !task.status }),
    });
    const updatedTask = await res.json();

    mutate((tasks: Task[] = []) =>
      tasks.map((t) => (t.id === task.id ? updatedTask : t))
    );
  }

  async function softDelete() {
    if (!confirm("Delete this task?")) return;

    const res = await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
    const deletedTask = await res.json();

    mutate((tasks: Task[] = []) =>
      tasks.filter((t) => t.id !== deletedTask.id)
    );
  }

  async function saveEdit() {
    const updatedTaskPayload = {
      title,
      category: category || null,
      priority,
      dueDate: dueDate || null,
    };

    // kirim ke backend
    const res = await fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTaskPayload),
    });

    if (!res.ok) {
      alert("Failed to update task");
      return;
    }

    const updatedTask = await res.json();

    // update SWR
    mutate((tasks: Task[] = []) =>
      tasks.map((t) => (t.id === task.id ? updatedTask : t))
    );

    setIsEditing(false);
  }

  return (
    <div className="p-4 rounded-2xl border bg-white shadow-sm hover:shadow-md transition">
      {isEditing ? (
        <input
          className="font-semibold text-lg border rounded px-2 py-1 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <h3 className="font-semibold text-lg">{task.title}</h3>
      )}

      {isEditing ? (
        <input
          className="mt-1 text-xs px-2 py-1 rounded-full border"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category (optional)"
        />
      ) : (
        task.category && (
          <span className="inline-block mt-1 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
            {task.category}
          </span>
        )
      )}

      <p className="text-xs text-gray-500 mt-2">
        Created: {new Date(task.created_at).toLocaleDateString("id-ID")}
      </p>

      <div className="mt-3 flex justify-between items-center">
        <div className="flex gap-2">
          {isEditing ? (
            <select
              className="px-3 py-1 text-xs border rounded-full"
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
            >
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
          ) : (
            <span
              className={`px-3 py-1 text-xs rounded-full ${
                task.priority === "high"
                  ? "bg-red-100 text-red-700"
                  : task.priority === "low"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {task.priority}
            </span>
          )}

          {isEditing ? (
            <input
              type="date"
              className="px-3 py-1 text-xs border rounded-full"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          ) : (
            task.dueDate && (
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  isOverdue
                    ? "bg-red-200 text-red-800"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                Due: {new Date(task.dueDate).toLocaleDateString("id-ID")}
              </span>
            )
          )}
        </div>

        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button
                onClick={saveEdit}
                className="text-purple-600 text-sm hover:underline"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-600 text-sm hover:underline"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-700 text-sm hover:underline"
              >
                Edit
              </button>
              <button
                onClick={toggleStatus}
                className="text-blue-600 text-sm hover:underline"
              >
                {task.status ? "Undo" : "Done"}
              </button>
              <button
                onClick={softDelete}
                className="text-red-600 text-sm hover:underline"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
