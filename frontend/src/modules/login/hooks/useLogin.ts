import { useId, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { LoginData } from "../types"
import { useMutation } from "@tanstack/react-query"
import { api } from "@/shared/api/ApiHandler"

export const useLogin = () => {
	const navigate = useNavigate()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const id = useId()
	const login = async () => {
		return await api.post<LoginData, { message: string }>("/auth/login", {
			email,
			password,
		})
	}

	const { isPending, isError, error, mutate } = useMutation({
		mutationKey: ["login"],
		mutationFn: login,
		onSuccess: data => {
			if (!("error" in data)) {
				navigate("/profile")
			}
		},
	})
  return {
    isPending, 
    email,
    password,
    isError,
    error,
    mutate,
    id,
    setEmail,
    setPassword
  }
}
