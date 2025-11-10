import axiosInstance from "@/lib/api";
import { create } from "zustand";

interface Employee {
  _id: string;
  name: string;
  email: string;
  role: string;
  salary: number;
  image?: string;
}

interface EmployeeState {
  employees: Employee[];
  isLoading: boolean;
  getAllEmployees: () => Promise<void>;
}

export const useEmployeeStore = create<EmployeeState>((set, get) => ({
  employees: [],
  isLoading: true,

  // get all employees
  getAllEmployees: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get<{ data: Employee[] }>(
        "/employee"
      );
      set({ employees: response.data.data });
    }
    catch (err: any) {
      console.log(
        "Error fetching employees:",
        err.response?.data || err.message
      );
    } 
    finally {
      set({ isLoading: false });
    }
  },
}));
