"use client";

import CustomLoading from "@/components/CustomLoading";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const { user, checkCurrentUser, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    checkCurrentUser();
  }, [checkCurrentUser]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) return <CustomLoading></CustomLoading>;



  return (
    <div>
      
    </div>
  );
};

export default HomePage;
