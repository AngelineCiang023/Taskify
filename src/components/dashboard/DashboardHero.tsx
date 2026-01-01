"use client";

import { useTaskSummary } from "./UseTaskSummary";

export default function DashboardHero() {
  const { progress, completed, total, isLoading } = useTaskSummary();

  return (
    <div className="bg-gradient-to-r from-purple-500 to-purple-400 rounded-3xl p-6 text-white">
      <h2 className="text-2xl font-semibold">Your Task</h2>

      {!isLoading && (
        <p className="text-sm text-purple-100 mt-1">
          {completed} of {total} tasks completed
        </p>
      )}

      <div className="mt-4 bg-white/20 rounded-full h-2 overflow-hidden">
        <div
          className="bg-white h-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-xs mt-2">{progress}% completed</p>
    </div>
  );
}
