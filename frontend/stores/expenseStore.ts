import axiosInstance from "@/lib/api";
import { create } from "zustand";

interface ExpenseData {
  _id?: string;
  name: string;
  description: string;
  date: string;
  amount: number;
}

interface ExpenseResponse {
  success: boolean;
  message: string;
  data: ExpenseData[];
}

interface ExpenseStoreState {
  expenses: ExpenseData[];
  isLoading: boolean;
  isAddingExpense: boolean;
  AddExpense: (value: ExpenseData) => Promise<ExpenseResponse>;
  getExpenses: () => Promise<void>;
}

export const useExpenseStore = create<ExpenseStoreState>((set) => ({
  expenses: [],
  isLoading: true,
  isAddingExpense: false,

  //add expense
  AddExpense: async (expenseData) => {
    set({ isAddingExpense: true });
    try {
      const response = await axiosInstance.post<{data:ExpenseData}>(
        "/expense",
        expenseData
      );

      set((state) => ({
        expenses: [response.data.data, ...state.expenses],
      }));
      return response.data;
    } catch (err: any) {
      return err.response.data;
    } finally {
      set({ isAddingExpense: false });
    }
  },

  // get Expenses
  getExpenses: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get<ExpenseResponse>("/expense");
      set({ expenses: response.data.data });
    } catch (err: any) {
      console.log(err.response.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));
