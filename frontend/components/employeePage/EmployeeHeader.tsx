"use client";

import { Plus, Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import Modal from "../ui/modal";

const EmployeeHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="flex-1">
      <div className="flex gap-5">
        {/* search input */}
        <input
          type="text"
          placeholder="Search employee..."
          className="w-full px-4 py-2 text-md border rounded outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition-all duration-200"
        />

        {/* button & modal */}
        <div className="w-1/6">
          <Button
            onClick={openModal}
            className="bg-green-800 text-md text-white hover:bg-green-700 py-5 flex items-center gap-2"
          >
            <Plus />
            Add New Employee
          </Button>

          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Add New Employee"
          >
            <div className="space-y-4">
              {/* Employee Name */}
              <span className="font-semibold">Employee Name</span>
              <input
                name="name"
                placeholder="Employee Name"
                className="w-full border rounded p-2"
              />

              {/* Email */}
              <span className="font-semibold">Email</span>
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full border rounded p-2"
              />

              {/* Password with eye toggle */}
              <span className="font-semibold">Password</span>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full border rounded p-2 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Select Role */}
              <span className="font-semibold">Select Role</span>
              <select
                name="role"
                className="w-full border rounded p-2 bg-white"
                defaultValue=""
              >
                <option value="" disabled>
                  Choose Role
                </option>
                <option value="manager">Manager</option>
                <option value="accountant">Accountant</option>
                <option value="employee">Employee</option>
              </select>

              {/* Salary */}
              <span className="font-semibold">Salary</span>
              <input
                name="salary"
                type="number"
                placeholder="Salary (BDT)"
                className="w-full border rounded p-2"
              />

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-2">
                <Button className="bg-green-700 hover:bg-green-600 text-white">
                  Add Employee
                </Button>
                <Button onClick={() => setIsOpen(false)} variant="secondary">
                  Close
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHeader;
