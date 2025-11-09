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

export interface Data{
  products:[],
  total:number
}

export interface ProductStore {
  products: Product[];
  product:Product | null;
  total:number,
  isLoading: boolean;
  isLoadingProductById:boolean;
  getProducts: (searchTerm?: string, pagination?:number) => Promise<void>;
  getProductById: (productId?:string) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  isLoading: true,
  total:0,
  product:null,
  isLoadingProductById:true,

  //get all product
  getProducts: async (searchTerm?: string, pagination?:number) => {
    set({ isLoading: true });
    try {

      const query = searchTerm ? `?search=${searchTerm}&page=${pagination}` : `?page=${pagination}`;

      const response = await axiosInstance.get<{ data: Data }>(
        `/production${query}`
      );
      set({ products: response.data.data.products });
      set({total: response.data.data.total});
    } catch (err: any) {
      console.log("Error in product store to fetch products!");
    } finally {
      set({ isLoading: false });
    }
  },

  // get a single product
  getProductById:async(productId?:string)=>{
    set({isLoadingProductById:true})
    try{
      const response = await axiosInstance.get<{data:Product}>(`/production/${productId}`);
      set({product:response.data.data});
    }
    catch(err){

    }
    finally{
      set({isLoadingProductById:false});
    }
  }
}));
