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
  employee: Employee | null;
  isLoading: boolean;
  isLoadingEmployeeById: boolean;
  isUpdatingEmployee: boolean;
  isDeleting:boolean;
  getAllEmployees: () => Promise<void>;
  getEmployeeById: (id: string) => Promise<void>;
  updateEmployee: (id: string, updatedData: Partial<Employee>) => Promise<void>;
  deleteEmployeeById:(id:string)=>Promise<void>;
}

export const useEmployeeStore = create<EmployeeState>((set, get) => ({
  employees: [],
  employee: null,
  isLoading: true,
  isLoadingEmployeeById: false,
  isUpdatingEmployee: false,
  isDeleting: false,

  // Get all employees
  getAllEmployees: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get<{ data: Employee[] }>("/employee");
      set({ employees: response.data.data });
    } catch (err: any) {
      console.error("Error fetching employees:", err.response?.data || err.message);
    } finally {
      set({ isLoading: false });
    }
  },

  // Get single employee by ID
  getEmployeeById: async (id: string) => {
    set({ isLoadingEmployeeById: true });
    try {
      const response = await axiosInstance.get<{ data: Employee }>(`/employee/${id}`);
      set({ employee: response.data.data });
    } catch (err: any) {
      console.error("Error fetching employee:", err.response?.data || err.message);
    } finally {
      set({ isLoadingEmployeeById: false });
    }
  },
  // Update employee
  updateEmployee: async (id: string, updatedData: Partial<Employee>) => {
    set({ isUpdatingEmployee: true });
    try {
      await axiosInstance.put(`/employee/${id}`, updatedData);

      // Local state update
      const updatedEmployees = get().employees.map((emp) =>
        emp._id === id ? { ...emp, ...updatedData } : emp
      );

      set({
        employees: updatedEmployees,
        employee:
          get().employee?._id === id
            ? { ...get().employee!, ...updatedData }
            : get().employee,
      });
    } catch (err: any) {
      console.error("Error updating employee:", err.response?.data || err.message);
    } finally {
      set({ isUpdatingEmployee: false });
    }
  },

  //delete employee
  deleteEmployeeById: async (id: string) => {
  set({ isDeleting: true });
  try {
    await axiosInstance.delete(`/employee/${id}`);
    set({
      employees: get().employees.filter((emp) => emp._id !== id),
    });
  } catch (err) {
    console.error("Error deleting employee:", err);
  } finally {
    set({ isDeleting: false });
  }
},
}));
