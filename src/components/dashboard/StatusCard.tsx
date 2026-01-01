"use client";

import { useTaskSummary } from "./UseTaskSummary";

export default function StatusCards() {
  const { pending, completed, overdue } = useTaskSummary();

  const cards = [
    { title: "Pending Tasks", value: pending },
    { title: "Completed Tasks", value: completed },
    { title: "Overdue", value: overdue },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      {cards.map((c) => (
        <div key={c.title} className="bg-white p-4 rounded-2xl shadow-sm">
          <p className="text-sm text-gray-500">{c.title}</p>
          <p className="text-2xl font-semibold mt-1">{c.value}</p>
        </div>
      ))}
    </div>
  );
}
