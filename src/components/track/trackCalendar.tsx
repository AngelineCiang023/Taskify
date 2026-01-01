"use client";

import { useState } from "react";

type TrackCalendarProps = {
  onSelectDate: (date: string | null) => void;
};

export default function TrackCalendar({ onSelectDate }: TrackCalendarProps) {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [activeDate, setActiveDate] = useState<string | null>(null);

  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const offset = (firstDay + 6) % 7;

  const dates = [
    ...Array(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  function prevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  }

  function formatDate(year: number, month: number, day: number) {
    const mm = String(month + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${year}-${mm}-${dd}`;
  }

  function selectDate(date: number | null) {
    if (!date) {
      setActiveDate(null);
      onSelectDate(null);
      return;
    }

    const formatted = formatDate(currentYear, currentMonth, date);

    setActiveDate(formatted);
    onSelectDate(formatted);
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <div className="flex justify-between items-center mb-2">
        <button onClick={prevMonth}>&lt;</button>

        <h3 className="font-semibold">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
          })}{" "}
          {currentYear}
        </h3>

        <button onClick={nextMonth}>&gt;</button>
      </div>

      <p className="text-xs text-gray-400 text-center mb-3">Weekly Schedule</p>

      <div className="grid grid-cols-7 gap-4 mt-4">
        {daysOfWeek.map((d, i) => (
          <div key={d + i} className="text-gray-400">
            {d}
          </div>
        ))}

        {dates.map((date, i) => {
          if (!date) return <div key={i} />;

          const d = formatDate(currentYear, currentMonth, date);
          const isSelected = d === activeDate;

          return (
            <button
              key={i}
              onClick={() => selectDate(date)}
              className={`p-2 rounded-xl transition ${
                isSelected
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 hover:bg-purple-200"
              }`}
            >
              {date}
            </button>
          );
        })}
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        {activeDate ? (
          <>
            Tasks on <b>{activeDate}</b>
          </>
        ) : (
          <>Klik tanggal untuk filter task</>
        )}
      </div>
    </div>
  );
}
