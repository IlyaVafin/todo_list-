import { api } from "@/shared/api/ApiHandler"
import type { LoginData } from "../types"

export const login = async (email: string, password: string) => {
	return await api.post<LoginData, { message: string }>("/auth/login", {
		email,
		password,
	})
}
