"use client";

import { useState } from "react";
import { mutate } from "swr";

type Task = {
  id: number;
  title: string;
  status: boolean;
  created_at: string;
  deleted_at: string | null;
};

export default function TaskItem({ task }: { task: Task }) {
  const [loading, setLoading] = useState(false);

  const toggleStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: !task.status }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert("Update failed: " + err.error);
      }

      mutate("/api/tasks");
    } finally {
      setLoading(false);
    }
  };

  const softDelete = async () => {
    if (!confirm("Delete this task?")) return;

    setLoading(true);
    try {
      await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
      mutate("/api/tasks");
    } finally {
      setLoading(false);
    }
  };

  const createdDate = new Date(task.created_at).toLocaleDateString("id-ID");

  return (
    <div className="border rounded p-4 flex justify-between items-start">
      <div>
        <p
          className={`font-medium ${
            task.status ? "line-through text-gray-400" : ""
          }`}
        >
          {task.title}
        </p>

        <p className="text-xs text-gray-500">Created: {createdDate}</p>

        <span
          className={`mt-1 inline-block px-2 py-1 text-xs rounded ${
            task.status
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {task.status ? "Completed" : "Pending"}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          disabled={loading}
          onClick={toggleStatus}
          className="px-3 py-1 border rounded"
        >
          {task.status ? "Undo" : "Done"}
        </button>

        <button
          disabled={loading}
          onClick={softDelete}
          className="px-3 py-1 rounded bg-red-500 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
