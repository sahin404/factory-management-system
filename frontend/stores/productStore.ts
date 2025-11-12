import { toast } from "@/components/ui/toast";
import axiosInstance from "@/lib/api";
import { create } from "zustand";

export interface Product {
  _id?: string;
  name: string;
  description: string;
  unit: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Data {
  products: [];
  total: number;
}

export interface ProductStore {
  products: Product[];
  product: Product | null;
  total: number;
  isLoading: boolean;
  isLoadingProductById: boolean;
  isUpdatingQuantity: boolean;
  isAddingSales: boolean;
  isUpdatingProduct: boolean;
  isDeleting:boolean;
  isAdding:boolean,
  resetProductsData: () => void;
  getProducts: (searchTerm?: string, pagination?: number) => Promise<void>;
  getProductById: (productId?: string) => Promise<void>;
  updateProductQuantity: (
    productId?: string,
    quantity?: number
  ) => Promise<void>;
  addSales: (productId?: string, salesNum?: number) => Promise<void>;
  updateProduct: (productId?: string, data?: Product) => Promise<void>;
  deleteProductById:(productId?:string)=>Promise<void>;
  addProduct:(newProduct?:Product)=>Promise<void>;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  isLoading: true,
  total: 0,
  product: null,
  isLoadingProductById: true,
  isUpdatingQuantity: false,
  isAddingSales: false,
  isUpdatingProduct: false,
  isDeleting:false,
  isAdding:false,

  // reset function
  resetProductsData: () => {
    set({ products: [], total: 0, isLoading: true }); 
  },

  //get all product
  getProducts: async (searchTerm?: string, pagination?: number) => {
    set({ isLoading: true });
    try {
      const query = searchTerm
        ? `?search=${searchTerm}&page=${pagination}`
        : `?page=${pagination}`;

      const response = await axiosInstance.get<{ data: Data }>(
        `/production${query}`
      );
      set({ products: response.data.data.products });
      set({ total: response.data.data.total });
    } catch (err: any) {
      console.log("Error in product store to fetch products!");
    } finally {
      set({ isLoading: false });
    }
  },

  // get a single product
  getProductById: async (productId?: string) => {
    set({ isLoadingProductById: true });
    try {
      const response = await axiosInstance.get<{ data: Product }>(
        `/production/${productId}`
      );
      set({ product: response.data.data });
    } catch (err) {
    } finally {
      set({ isLoadingProductById: false });
    }
  },

  // update only quantity
  updateProductQuantity: async (productId?: string, quantity?: number) => {
    set({ isUpdatingQuantity: true });
    try {
      const response = await axiosInstance.patch<{ data: Product }>(
        `/production/${productId}`,
        { quantity }
      );
      set({ product: response.data.data });

      // update products list too if it exists
      set((state) => ({
        products: state.products.map((p) =>
          p._id === productId ? response.data.data : p
        ),
      }));
    } catch (err: any) {
      console.log("Error updating quantity:", err);
    } finally {
      set({ isUpdatingQuantity: false });
    }
  },

  //update all field
  updateProduct: async (productId?: string, data?: Product) => {
    set({ isUpdatingProduct: true });
    try {
      if (!productId) {
        throw new Error("Product ID is required for update");
      }

      const response = await axiosInstance.put<{ data: Product }>(
        `/production/${productId}`,
        data
      );

      const updatedProduct = response.data.data;

      //update the product in store
      set({ product: updatedProduct });

      // update the product list in store
      set((state) => ({
        products: state.products.map((p) =>
          p._id === productId ? updatedProduct : p
        ),
      }));
    } catch (err: any) {
      console.error(
        "Error updating product:",
        err.response?.data || err.message
      );
    } finally {
      set({ isUpdatingProduct: false });
    }
  },

  // add sales
  addSales: async (productId?: string, salesNum?: number) => {
    set({ isAddingSales: true });
    try {
      const response = await axiosInstance.post<{ data: Product }>(
        `/sales/add/${productId}`,
        { salesNum }
      );

      // update the product / modal
      set({ product: response.data.data });
      // update product staes
      const sold = salesNum ?? 0;
      set((state) => ({
        products: state.products.map((p) =>
          p._id === productId ? { ...p, quantity: p.quantity - sold } : p
        ),
      }));
    } catch (err) {
      console.log("An error occured to adding sales.", err);
    } finally {
      set({ isAddingSales: false });
    }
  },

  // delete a product item
  deleteProductById: async(productId?:string)=>{
    set({isDeleting:true});
    try{
      await axiosInstance.delete(`/production/${productId}`);
      set((state) => ({
      products: state.products.filter((p) => p._id !== productId),
    }));
    } 
    catch{
      console.log("An error occured to delete prodcut item");
      toast.error("Error occurred!", {
        position: "top-right",
        description: "Something went wrong. Please try again.",
      });
    }
    finally{
      set({isDeleting:false});
    }
    
  },

  addProduct: async (newProduct?: Product) => {
    if (!newProduct) return;
    set({ isAdding: true });

    try {
      const response = await axiosInstance.post<{ data: Product }>(
        "/production",
        newProduct
      );
      set((state) => ({
        products: [response.data.data, ...state.products],
      }));
    } catch (err: any) {
      console.log("Error adding product:", err);
    } finally {
      set({ isAdding: false });
    }
  },
}));
