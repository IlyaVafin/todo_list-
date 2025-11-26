import { useId, useState } from "react"

import Email from "./Email"
import Password from "./Password"
import { Button } from "@/components/button/button"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { api } from "@/shared/api/ApiHandler"
import type { LoginData } from "./types"

const Login = () => {
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
		onError: (err) => {
			console.log(err.name)
		}
	})
	return (
		<form
			onSubmit={async e => {
				e.preventDefault()
				mutate()
			}}
			className='flex flex-col gap-8 justify-center items-center'
		>
			<div className='flex flex-col gap-8 max-w-[500px] w-full'>
				<Email email={email} setEmail={setEmail} id={id} />
				<Password id={id} password={password} setPassword={setPassword} />
				<Button disabled={isPending} className='w-[500px] mt-4' type='submit'>
					{isPending ? "Login in..." : "Login"}
				</Button>
				{isError && <p>{error.message}</p>}
			</div>
		</form>
	)
}

export default Login
