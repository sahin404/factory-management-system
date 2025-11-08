import axiosInstance from "@/lib/api";
import { create } from "zustand";

export interface Product {
  _id: string;
  name: string;
  description: string;
  unit: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ProductStore {
  products: Product[];
  isLoading: boolean;
  getProducts: (searchTerm?: string) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  isLoading: true,

  getProducts: async (searchTerm?: string) => {
    set({ isLoading: true });
    try {
      const query = searchTerm ? `?search=${searchTerm}` : "";
      const response = await axiosInstance.get<{ data: Product[] }>(
        `/production${query}`
      );
      set({ products: response.data.data });
    } catch (err: any) {
      console.log("Error in product store to fetch products!");
    } finally {
      set({ isLoading: false });
    }
  },
}));
