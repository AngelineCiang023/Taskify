"use client";

import useSWR from "swr";
import TaskCard from "./TaskCard";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type TaskListProps = {
  selectedDate?: string | null;
};

export default function TaskList({ selectedDate }: TaskListProps) {
  const [priorityFilter, setPriorityFilter] = useState<
    "all" | "low" | "medium" | "high"
  >("all");

  const { data, error, mutate, isLoading } = useSWR(
    `/api/tasks${
      priorityFilter !== "all" ? `?priority=${priorityFilter}` : ""
    }`,
    fetcher
  );

  const isTaskActiveOnDate = (task: any, selectedDate: string) => {
    if (!task.createdAt) return false;

    const start = new Date(task.createdAt);
    const end = task.dueDate ? new Date(task.dueDate) : start;

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    const selected = new Date(selectedDate);
    selected.setHours(0, 0, 0, 0);

    return selected >= start && selected <= end;
  };

  const filteredData = selectedDate
    ? data?.filter((task: any) => {
        if (!task.created_at) return false;

        const selected = new Date(selectedDate).setHours(0, 0, 0, 0);
        const created = new Date(task.created_at).setHours(0, 0, 0, 0);

        // kalau punya dueDate, dianggap range task
        if (task.dueDate) {
          const due = new Date(task.dueDate).setHours(23, 59, 59, 999);
          return selected >= created && selected <= due;
        }

        // kalau tidak punya dueDate, masih dianggap aktif
        return selected >= created;
      })
    : data;

  const totalTasks = filteredData?.length ?? 0;

  const completedCount =
    filteredData?.filter((task: any) => task.status === true).length ?? 0;

  const progressCount = totalTasks - completedCount;

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);

  return (
    <div>
      <div className="flex gap-2 items-center mt-3">
        <span className="text-sm text-gray-600">Filter:</span>
        <select
          className="border rounded px-3 py-2"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as any)}
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {selectedDate && totalTasks > 0 && (
        <div className="mt-4 bg-gray-100 rounded-2xl p-4">
          <p className="text-sm font-semibold text-gray-700 text-center">
            Progress on {selectedDate}
          </p>

          <p className="text-2xl font-bold text-purple-600 text-center">
            {completionRate}% Done
          </p>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-gray-300 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-purple-600 transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>

          {/* Status Summary */}
          <div className="flex justify-center gap-6 mt-3 text-sm">
            <span className="text-green-600 font-medium">
              ✓ {completedCount} Completed
            </span>

            <span className="text-yellow-600 font-medium">
              • {progressCount} On Progress
            </span>
          </div>
        </div>
      )}

      {selectedDate && totalTasks === 0 && (
        <p className="text-gray-400 text-sm mt-4 text-center">
          No tasks for this date
        </p>
      )}

      <div className="mt-4">
        {isLoading && <p>Loading tasks...</p>}
        {error && <p>Failed to load tasks</p>}

        {!isLoading && !error && filteredData?.length === 0 && (
          <p className="text-gray-400 text-sm mt-4">No tasks for this date</p>
        )}

        {!isLoading && !error && filteredData?.length > 0 && (
          <div className="grid grid-cols-2 gap-5 mt-3">
            {filteredData.map((task: any) => (
              <TaskCard key={task.id} task={task} mutate={mutate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
