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
  getProducts: () => Promise<void>;
}



export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  isLoading: true,

  getProducts: async () => {
    set({isLoading:true});

    try {
      const response = await axiosInstance.get<{data:Product[]}>("/production");
      set({products:response.data.data});
    }
    catch (err) {

    } 
    finally{
        set({isLoading:false});
    }
  },
}));
