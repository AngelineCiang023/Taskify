"use client";

import { useState } from "react";
import { mutate } from "swr";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        priority,
        category: category || null,
        dueDate: dueDate || null,
      }),
    });

    setTitle("");
    setCategory("");
    setDueDate("");
    setPriority("medium");

    mutate("/api/tasks");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-4 gap-2">
      {/* title */}
      <input
        className="border rounded px-3 py-2 col-span-2"
        placeholder="New task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      {/* priority select */}
      <select
        className="border rounded px-2 py-2"
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value as "low" | "medium" | "high")
        }
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button className="bg-purple-600 text-white px-4 py-2 rounded">
        Add
      </button>

      {/* Optional fields */}
      <input
        className="border rounded px-3 py-2 col-span-2"
        placeholder="Category (optional)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="date"
        className="border rounded px-3 py-2"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
    </form>
  );
}
