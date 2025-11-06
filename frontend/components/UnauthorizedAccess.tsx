"use client";

import { ShieldAlert } from "lucide-react";
import Link from "next/link";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-6">
      {/* Icon */}
      <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />

      {/* Message */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-2">
        Unauthorized Access
      </h1>
      <p className="text-gray-500 max-w-md">
        You don’t have permission to view this page. Please contact your
        administrator if you think this is a mistake.
      </p>

      {/* Back to dashboard */}
      <Link
        href="/dashboard"
        className="mt-6 bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800 transition-colors duration-200"
      >
        Go Back to Dashboard
      </Link>
    </div>
  );
};

export default Unauthorized;
