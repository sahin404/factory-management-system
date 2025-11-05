import axiosInstance from "@/lib/api";
import toast from "react-hot-toast";
import { create } from "zustand";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  image:string;
  salary:Number;
}

interface LoginResponse {
  data: {
    token: string;
    user: User;
  };
}

interface CheckAuth {
  data: User;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isLoggingIn: boolean;
  errorMessage:string;
  checkCurrentUser: () => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  //   logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isLoggingIn: false,
  errorMessage:'',

  // check current user
  checkCurrentUser: async () => {
    set({ isLoading: true });

    try {
      const res = await axiosInstance.get<CheckAuth>("/auth/me");
      set({ user: res.data.data });
    } catch (err: any) {
    } finally {
      set({ isLoading: false });
    }
  },

  // login user
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post<LoginResponse>("/auth/login", data);
      set({ user: res.data.data.user });

      // set jwt token into local storage
      localStorage.setItem("token", res.data.data.token);
      toast.success("Logged in successfully!");
    } catch (err: any) {
      console.log(err.response?.data || err.message);
      set({errorMessage:"Invalid Credentials. Try Again!"})
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));
