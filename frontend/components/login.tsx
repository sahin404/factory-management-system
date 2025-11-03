"use client"
import React from "react";
import { Eye, EyeOff } from "lucide-react";


function Login5() {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
  <div className="w-full max-w-sm mx-auto border rounded-xl shadow-md p-8 space-y-6 bg-white">
    <div className="text-center space-y-2">
      <h1 className="text-3xl font-semibold text-green-600">
        Pure Agro Industries
      </h1>
      <p className="text-sm text-gray-500">
        Enter your credentials to continue
      </p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder="name@example.com"
          className="mt-1 w-full h-10 border rounded-md px-3 text-sm focus:ring-2 focus:ring-green-600 outline-none"
        />
      </div>

      <div>
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <div className="relative mt-2">
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                required
                placeholder="Enter your password"
                className="w-full h-12 border rounded-md px-4 pr-10 text-base focus:ring-2 focus:ring-green-600 outline-none"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
              >
                {passwordVisible ? (
                  <Eye size={20} strokeWidth={1.8} />
                ) : (
                  <EyeOff size={20} strokeWidth={1.8} />
                )}
              </button>
            </div>
      </div>

      <button
        type="submit"
        className="w-full h-10 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition"
      >
        Sign In
      </button>
    </form>
  </div>
</div>

  );
}

export default Login5;