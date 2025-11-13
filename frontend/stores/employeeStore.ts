import axiosInstance from "@/lib/api";
import { create } from "zustand";

export interface Employee {
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
  isDeleting: boolean;
  totalEmployees: number;
  resetEmployeesData: () => void;
  getAllEmployees: (searchTerm: string, currentPage: number) => Promise<void>;
  getEmployeeById: (id: string) => Promise<void>;
  updateEmployee: (id: string, updatedData: Partial<Employee>) => Promise<void>;
  deleteEmployeeById: (id: string) => Promise<void>;
  addEmployee: (newEmployee: Employee) => void;
}

interface GetAllEmployeeState {
  success: boolean;
  message: string;
  data: {
    employees: Employee[];
    totalEmployees: number;
  };
}

export const useEmployeeStore = create<EmployeeState>((set, get) => ({
  employees: [],
  employee: null,
  isLoading: true,
  totalEmployees: 0,
  isLoadingEmployeeById: false,
  isUpdatingEmployee: false,
  isDeleting: false,
  // reset function
  resetEmployeesData: () => {
    set({ employees: [], totalEmployees: 0, isLoading: true });
  },
  // Get all employees
  getAllEmployees: async (searchTerm?: string, currentPage?: number) => {
    set({ isLoading: true });
    try {
      // if user search then page number should 1
      const pageToUse = searchTerm ? 1 : currentPage || 1;

      const query = searchTerm
        ? `?page=${pageToUse}&search=${searchTerm}`
        : `?page=${currentPage}`;

      const response = await axiosInstance.get<GetAllEmployeeState>(
        `/employee${query}`
      );
      set({ employees: response.data.data.employees });
      set({ totalEmployees: response.data.data.totalEmployees });
    } catch (err: any) {
      console.log(
        "Error fetching employees:",
        err.response?.data || err.message
      );
    } finally {
      set({ isLoading: false });
    }
  },

  // Get single employee by ID
  getEmployeeById: async (id: string) => {
    set({ isLoadingEmployeeById: true });
    try {
      const response = await axiosInstance.get<{ data: Employee }>(
        `/employee/${id}`
      );
      set({ employee: response.data.data });
    } catch (err: any) {
      console.log(
        "Error fetching employee:",
        err.response?.data || err.message
      );
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
      console.log(
        "Error updating employee:",
        err.response?.data || err.message
      );
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
      console.log("Error deleting employee:", err);
    } finally {
      set({ isDeleting: false });
    }
  },

  // EmployeeStore
  addEmployee: (newEmployee: Employee) => {
    set({ employees: [...get().employees, newEmployee] });
  },
}));
