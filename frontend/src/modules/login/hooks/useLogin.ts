import { useMutation } from "@tanstack/react-query"
import { useId, useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../api/login"

export const useLogin = () => {
	const navigate = useNavigate()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const id = useId()

	const { isPending, isError, error, mutate } = useMutation({
		mutationKey: ["login"],
		mutationFn: () => login(email, password),
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
		setPassword,
	}
}
