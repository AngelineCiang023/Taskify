"use client";

import { LayoutDashboard, ListTodo, Folder, BarChart2 } from "lucide-react";
import Link from "next/link";

export default function Sidebar({
  activeMenu,
  setActiveMenu,
}: {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}) {
  return (
    <aside className="w-64 bg-purple-50 min-h-screen p-6 flex flex-col">
      {/* Logo */}
      <Link
        href="/home"
        onClick={() => setActiveMenu("Dashboard")}
        className="flex items-center gap-2 mb-10 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <img
            src="/img/logo.png"
            alt="Taskify Logo"
            className="w-10 h-10 object-contain rounded-xl"
          />

          <h1 className="text-2xl font-extrabold tracking-tight">
            <span className="text-purple-700">Taskify</span>
          </h1>
        </div>
      </Link>

      {/* Menu */}
      <nav className="flex flex-col gap-4 text-sm">
        <MenuItem
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
          active={activeMenu === "Dashboard"}
          onClick={() => setActiveMenu("Dashboard")}
        />
        <MenuItem
          icon={<ListTodo size={18} />}
          label="Track"
          active={activeMenu === "Track"}
          onClick={() => setActiveMenu("Track")}
        />
      </nav>

      <div className="mt-auto text-xs text-gray-400">Support • Settings</div>
    </aside>
  );
}

function MenuItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer ${
        active
          ? "bg-purple-600 text-white"
          : "text-gray-600 hover:bg-purple-100"
      }`}
      onClick={onClick}
    >
      {icon}
      {label}
    </div>
  );
}
