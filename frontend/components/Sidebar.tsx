"use client";

import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { ChevronRight, User } from "lucide-react";
import Link from "next/link";
import {
  Home,
  Clock,
  Users,
  DollarSign,
  FileText,
  Package,
} from "lucide-react";
import SidebarSkeleton from "./SidebarSkeleton";

const Sidebar = () => {
  const { user, isLoading, checkCurrentUser } = useAuthStore();
  const [activeMenu, setActiveMenu] = useState("Overview");

  useEffect(() => {
    const checkAuth = async () => {
      await checkCurrentUser();
    };
    checkAuth();
  }, [checkCurrentUser]);

  if (!user || isLoading) return <SidebarSkeleton></SidebarSkeleton>;

  // Admin
  const AdminMenus = [
    { id: 1, name: "Overview", link: "/dashboard/overview/admin", icon: Home },
    {
      id: 7,
      name: "Productions & Sales",
      link: "/dashboard/production",
      icon: Package,
    },
    { id: 2, name: "Attendance", link: "/dashboard/attendance", icon: Clock },
    { id: 3, name: "Employees", link: "/dashboard/employee", icon: Users },
    { id: 4, name: "Expense", link: "/dashboard/expense", icon: DollarSign },
    { id: 6, name: "Salary", link: "/dashboard/salary", icon: FileText },
  ];

  // Manager menus
  const ManagerMenus = [
    {
      id: 1,
      name: "Overview",
      link: "/dashboard/overview/manager",
      icon: Home,
    },
    {
      id: 5,
      name: "Productions & Sales",
      link: "/dashboard/production",
      icon: Package,
    },
    { id: 2, name: "Attendance", link: "/dashboard/attendance", icon: Clock },
    { id: 3, name: "Employees", link: "/dashboard/employee", icon: Users },
  ];

  // Accountant menus
  const AccountantMenus = [
    {
      id: 1,
      name: "Overview",
      link: "/dashboard/overview/accountant",
      icon: Home,
    },
    { id: 2, name: "Expense", link: "/dashboard/expense", icon: DollarSign },
    { id: 3, name: "Salary", link: "/dashboard/salary", icon: FileText },
  ];

  // Employee menus
  const EmployeeMenus = [
    {
      id: 1,
      name: "Overview",
      link: "/dashboard/overview/employee",
      icon: Home,
    },
  ];

  return (
    <div className="dark:bg-[#1b3d2e] bg-green-900 text-gray-300 h-screen w-full flex flex-col p-5">
      <h1 className="text-white text-3xl font-semibold mb-4">
        Pure Agro Industries
      </h1>

      {/* Separator */}
      <Separator className="bg-gray-400 my-4" />

      {/* Menu Items */}
      <ul className="flex-1 overflow-y-auto">
        {/* if user is admin */}
        {user.role === "admin" && (
          <div className="space-y-3">
            {AdminMenus.map((menu) => {
              const Icon = menu.icon; // icon component
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
                    <span className="flex items-center gap-3">
                      <Icon className="w-5 h-5" /> {/* Lucide icon */}
                      {menu.name}
                    </span>
                    {isActive && (
                      <ChevronRight size={16} className="text-white" />
                    )}
                  </Link>
                </li>
              );
            })}
          </div>
        )}

        {/* if user is manager */}
        {user.role === "manager" && (
          <div className="space-y-3">
            {ManagerMenus.map((menu) => {
              const Icon = menu.icon; // icon component
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
                    <span className="flex items-center gap-3">
                      <Icon className="w-5 h-5" /> {/* Lucide icon */}
                      {menu.name}
                    </span>
                    {isActive && (
                      <ChevronRight size={16} className="text-white" />
                    )}
                  </Link>
                </li>
              );
            })}
          </div>
        )}

        {/* if user is accountant */}
        {user.role === "accountant" && (
          <div className="space-y-3">
            {AccountantMenus.map((menu) => {
              const Icon = menu.icon; // icon component
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
                    <span className="flex items-center gap-3">
                      <Icon className="w-5 h-5" /> {/* Lucide icon */}
                      {menu.name}
                    </span>
                    {isActive && (
                      <ChevronRight size={16} className="text-white" />
                    )}
                  </Link>
                </li>
              );
            })}
          </div>
        )}

        {/* if user is employee */}
        {user.role === "employee" && (
          <div className="space-y-3">
            {EmployeeMenus.map((menu) => {
              const Icon = menu.icon; // icon component
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
                    <span className="flex items-center gap-3">
                      <Icon className="w-5 h-5" /> {/* Lucide icon */}
                      {menu.name}
                    </span>
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

      {/* footer */}
      <div className="mt-auto pt-4">
        <Separator className="bg-gray-400 my-4" />
        <div className="flex items-center gap-2 px-4 py-2 bg-green-800/70 rounded-lg">
          <span>
            {" "}
            <User></User>{" "}
          </span>
          <span className="text-green-100 font-medium text-sm">
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
