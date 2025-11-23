import { create } from "zustand";
import axiosInstance from "@/lib/api";

interface SalePayload {
  productId: string;
  productName: string;
  unit: number;
  totalPrice: number;
  buyerName: string;
  buyerMobileNumber: string;
}

interface SalesStore {
  isAddingSale: boolean;
  addNewSale: (data: SalePayload) => Promise<void>;
}

export const useSalesStore = create<SalesStore>((set) => ({
  isAddingSale: false,

  addNewSale: async (data: SalePayload) => {
    set({ isAddingSale: true });
    try {
      // Ensure productName is defined
      if (!data.productName) throw new Error("Product name is required");

      await axiosInstance.post("/sales/add", data);

    } catch (err) {
      console.log("Error adding sale:", err);
      throw err;
    } finally {
      set({ isAddingSale: false });
    }
  },
}));
