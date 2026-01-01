"use client";

export default function Header() {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Hi, Angeline 👋
          </h1>
          <p className="text-sm text-gray-500">Let’s finish your task today!</p>
        </div>

        <div className="hidden md:block">
          <div className="w-40 h-28 bg-white/20 rounded-2xl" />
        </div>

        <div className="flex items-center gap-3 bg-purple-100 px-4 py-2 rounded-xl">
          <img
            src="https://i.pravatar.cc/40"
            className="w-9 h-9 rounded-full"
          />
          <div className="text-sm">
            <p className="font-medium">Angeline</p>
            <p className="text-xs text-gray-500">UI/UX Designer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
