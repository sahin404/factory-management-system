"use client";

import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";
import SidebarSkeleton from "./SidebarSkeleton";
import { Separator } from "./ui/separator";

const Sidebar = () => {
  const { user, isLoading, checkCurrentUser } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      await checkCurrentUser();
    };
    checkAuth();
  }, [checkCurrentUser]);

  if (!user || isLoading) return <SidebarSkeleton></SidebarSkeleton>;
  console.log(user);
  const menus = ["Overview", "Attendance", "Employees", ""];

  return (
    <div className="bg-green-800 h-screen w-full p-5">
      <h1 className=" text-gray-300 text-2xl">Pure Agro Industries</h1>
      <div className="">
        <Separator className="bg-gray-300 my-5"></Separator>
      </div>
      <div>
    
      </div>
    </div>
  );
};

export default Sidebar;
