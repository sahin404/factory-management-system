"use client";

export default function NavbarSkeleton() {
  return (
    <div className="flex items-center justify-between shadow-sm p-2 animate-pulse">
      {/* Left side: Role title */}
      <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded-md"></div>

      {/* Right side: Avatar + Name + Button */}
      <div className="flex items-center gap-4">
        {/* Dark mode toggle placeholder */}
        <div className="h-9 w-9 bg-gray-300 dark:bg-gray-700 rounded-md"></div>

        {/* Name and online text */}
        <div className="flex flex-col items-end gap-1">
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          <div className="h-3 w-12 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        </div>

        {/* Avatar */}
        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>

        {/* Logout button */}
        <div className="h-9 w-24 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      </div>
    </div>
  );
}
