import { useMutation } from "@tanstack/react-query"
import { useId, useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../api/login"
import { useAuthContext } from "@/shared/context/auth/useAuthContext"

export const useLogin = () => {
	const navigate = useNavigate()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const id = useId()
	const { checkAuth } = useAuthContext()
	const { isPending, isError, error, mutate } = useMutation({
		mutationKey: ["login"],
		mutationFn: () => login(email, password),
		onSuccess: async data => {
			if (!("error" in data)) {
				await checkAuth()
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
		setPassword,
	}
}
