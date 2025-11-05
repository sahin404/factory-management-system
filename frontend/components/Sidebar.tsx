"use client";

import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const { user, isLoading, checkCurrentUser } = useAuthStore();
  const [activeMenu, setActiveMenu] = useState("Overview");

  useEffect(() => {
    const checkAuth = async () => {
      await checkCurrentUser();
    };
    checkAuth();
  }, [checkCurrentUser]);

  if (!user || isLoading) return <div className="p-5">Loading Sidebar...</div>;

  // Admin
  const AdminMenus = [
    { id: 1, name: "Overview", link: "/dashboard/overview/admin" },
    { id: 2, name: "Attendance", link: "/dashboard/attendance" },
    { id: 3, name: "Employees", link: "/dashboard/employee" },
    { id: 4, name: "Expense", link: "/dashboard/expense" },
    { id: 5, name: "Sales", link: "/dashboard/sales" },
    { id: 6, name: "Salary", link: "/dashboard/salary" },
    { id: 7, name: "Productions", link: "/dashboard/production" },
  ];

  // manager menus
  const ManagerMenus = [
    { id: 1, name: "Overview", link: "/dashboard/overview/manager" },
    { id: 2, name: "Attendance", link: "/dashboard/attendance" },
    { id: 3, name: "Employees", link: "/dashboard/employees" },
    { id: 4, name: "Sales", link: "/dashboard/sales" },
    { id: 5, name: "Productions", link: "/dashboard/production" },
  ];

  // accountant
  const AccountantMenus = [
    { id: 1, name: "Overview", link: "/dashboard/overview/accountant" },
    { id: 2, name: "Expense", link: "/dashboard/expense" },
    { id: 3, name: "Salary", link: "/dashboard/salary" },
  ];

  // employee
  const EmployeeMenus = [
    { id: 1, name: "Overview", link: "/dashboard/overview/employee" },
  ];

  return (
    <div className="bg-green-900 text-gray-300 h-screen w-full flex flex-col p-5">
      <h1 className="text-white text-3xl font-semibold mb-4">
        Pure Agro Industries
      </h1>

      {/* Separator */}
      <Separator className="bg-gray-400 my-4" />

      {/* Menu Items */}
      <ul className="flex-1 space-y-1 overflow-y-auto">
        {user.role === "employee" && (
          <div>
            {AdminMenus.map((menu) => {
              const isActive = menu.name === activeMenu;
              return (
                <li key={menu.id}>
                  <Link
                    href={menu.link}
                    onClick={() => setActiveMenu(menu.name)}
                    className={`
                  flex items-center justify-between w-full px-4 py-2 rounded-lg
                  ${
                    isActive
                      ? "bg-green-700 text-white font-medium"
                      : "hover:bg-green-800 hover:text-white"
                  }
                  transition-colors duration-200
                `}
                  >
                    {menu.name}
                    {isActive && (
                      <ChevronRight size={16} className="text-white" />
                    )}
                  </Link>
                </li>
              );
            })}
          </div>
        )}
      </ul>

      {/* Footer / Logout */}
      <div className="mt-auto pt-4">
        <Separator className="bg-gray-400 my-2" />
        <button
          onClick={() => console.log("Logout")}
          className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
