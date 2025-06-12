import { apiClient } from "@/lib/axios";
import type { LoginSchema, SignupSchema } from "@/schemas/auth.schema";

const signup = (data: SignupSchema) => {
  return apiClient.post("/auth/signup", data);
};

const login = (data: LoginSchema) => {
  return apiClient.post("/auth/login", data);
};

const logout = () => {
  return apiClient.post("/auth/logout");
};

export { signup, login, logout };
