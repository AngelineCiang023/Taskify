"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import DashboardHero from "@/components/dashboard/DashboardHero";
import StatusCards from "@/components/dashboard/StatusCard";
import TaskForm from "@/components/tasks/TaskForm";
import TaskList from "@/components/tasks/TaskList";
import TrackCalendar from "@/components/track/trackCalendar";

export default function Home() {
  const [activeMenu, setActiveMenu] = useState<string>("Dashboard");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#F5F3FF] flex">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <section className="flex-1 flex gap-6 p-8">
        {/* LEFT */}
        <div className="flex-1 space-y-6">
          <Header />

          {activeMenu === "Dashboard" && (
            <>
              <DashboardHero />
              <StatusCards />
              <div className="bg-white p-6 rounded-3xl shadow-sm">
                <TaskForm />
                <TaskList selectedDate={selectedDate} />
              </div>
            </>
          )}

          {activeMenu === "Track" && (
            <div className="bg-white p-6 rounded-3xl shadow-sm space-y-6">
              <TrackCalendar onSelectDate={setSelectedDate} />

              <TaskList selectedDate={selectedDate} />
            </div>
          )}

          {/* Bisa ditambahin kondisi untuk Projects / Reports */}
        </div>
      </section>
    </main>
  );
}
