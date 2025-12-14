import { api } from "./axios";
import type { LoginRequest, LoginResponse } from "../types/dto";

export async function login(data: LoginRequest) {
  const res = await api.post<LoginResponse>("/auth/login", data);
  return res.data;
}
