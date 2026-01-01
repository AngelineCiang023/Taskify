import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-24">
        <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-10 flex flex-col items-center text-center">
          <span className="px-4 py-1 rounded-full text-sm bg-purple-100 text-purple-700 font-medium">
            Stay Productive. Stay Organized.
          </span>

          <h2 className="text-5xl font-extrabold text-gray-900 mt-4 leading-tight flex items-center gap-3">
            <img
              src="/img/logo.png"
              alt="Taskify Logo"
              className="w-12 h-12 rounded-2xl object-contain"
            />
            Welcome to <span className="text-purple-600">Taskify</span>
          </h2>

          <p className="text-lg text-gray-600 mt-4 max-w-2xl">
            A smart and lightweight productivity app to manage your tasks, track
            your progress, and stay focused on your daily goals — without
            distractions.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/"
              className="px-5 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
            >
              Get Started
            </Link>

            <a
              href="/register"
              className="px-5 py-3 bg-gray-200 rounded-xl font-semibold hover:bg-gray-300 transition"
            >
              Create Account
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
