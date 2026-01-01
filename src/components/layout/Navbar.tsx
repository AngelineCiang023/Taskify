"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full bg-white/80 backdrop-blur border-b border-gray-200">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
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

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className="text-gray-600 hover:text-purple-700 transition"
          >
            Home
          </Link>

          <Link
            href="/profile"
            className="text-gray-600 hover:text-purple-700 transition"
          >
            Profile
          </Link>

          {/* Divider */}
          <span className="w-px h-6 bg-gray-300" />

          {/* AUTH BUTTONS */}
          <Link
            href="/login"
            className="px-4 py-2 rounded-xl border border-gray-300 hover:border-purple-500 hover:bg-purple-50 transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-4 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 shadow-sm transition"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}
