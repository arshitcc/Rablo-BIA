import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import type { LoginSchema, SignupSchema } from "@/schemas/auth.schema";
import type { IUser } from "@/types";
import { login, logout, signup } from "@/api/auth";

interface AuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  error: string | null;
  login: (data: LoginSchema) => Promise<void>;
  signup: (data: SignupSchema) => Promise<void>;
  logout: () => Promise<void>;
}

const initialAuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialAuthState,
      login: async (data) => {
        set({ error: null });
        try {
          const response = await login(data);
          if (response.data.success) {
            set({
              user: response.data.data,
              isAuthenticated: true,
              error: null,
            });
            toast.success("Authentication Successful");
          } else {
            set({ error: response.data.message });
            toast.error(response.data.message);
          }
        } catch (error: AxiosError | any) {
          set({ error: error.response?.data?.message || "Login error" });
          toast.error(error.response?.data?.message || "Login error");
        }
      },
      signup: async (data) => {
        set({ error: null });
        try {
          const response = await signup(data);
          if (response.data.success) {
            set({ user: response.data.data, error: null });
            toast.success("Registration Successful. Please Login");
          } else {
            set({ error: response.data.message });
            toast.error(response.data.message);
          }
        } catch (error: AxiosError | any) {
          set({ error: error.response?.data?.message || "Signup error" });
          toast.error(error.response?.data?.message || "Signup error");
        }
      },
      logout: async () => {
        set({ error: null });
        try {
          const response = await logout();
          if (response.data.success) {
            set(initialAuthState);
            toast.success("Logout Successful");
          } else {
            set(initialAuthState);
            toast.error(response.data.message);
          }
        } catch (error: AxiosError | any) {
          set(initialAuthState);
          toast.error(error.response?.data?.message || "Logout error");
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
