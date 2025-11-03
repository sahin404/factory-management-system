import axiosInstance from "@/lib/api";
import toast from "react-hot-toast";
import { create } from "zustand";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface LoginResponse{
    data:{
        token:string,
        user:User
    }
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isLoggingIn: boolean;
 // checkAuth: () => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
//   logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isLoggingIn: false,

  // Login user
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post<LoginResponse>("/auth/login", data);
      set({ user: res.data.data.user });

      // set jwt token into local storage
      localStorage.setItem('token', res.data.data.token);
      toast.success("Logged in successfully!");
    }
    catch (err: any) {
      console.log(err.response?.data || err.message);
      toast.error("Invalid credentials");
    }
    finally {
      set({ isLoggingIn: false });
    }
  },

}));
