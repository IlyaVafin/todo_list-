import { useId, useState } from "react"

import Email from "./Email"
import Password from "./Password"
import { Button } from "@/components/button/button"
import { useNavigate } from "react-router-dom"
interface ResponseError {
	message: string
	error: string
	statusCode: number
}
interface ResponseSuccess {
	message: string
	success: boolean
}
type LoginResponse = ResponseError | ResponseSuccess
const Login = () => {
	const navigate = useNavigate()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState<ResponseError>({
		error: "",
		message: "",
		statusCode: 0,
	})
	const id = useId()
	const handleSubmit: () => Promise<LoginResponse> = async () => {
		try {
			const response = await fetch("http://localhost:3000/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ email, password }),
			})
			if (!response.ok) {
				const errorData: ResponseError = await response.json()
				return {
					error: errorData.error,
					message: errorData.message,
					statusCode: errorData.statusCode,
				}
			}
			if (response.ok) {
				navigate("/profile")
			}
			const successData: ResponseSuccess = await response.json()
			return successData
		} catch (error: unknown) {
			if (error instanceof Error) {
				return {
					error: error.name,
					message: error.message,
					statusCode: 0,
				}
			}
			return {
				error: "Unknown error",
				message: "Something wrong",
				statusCode: 500,
			}
		}
	}
	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault()
				const result = await handleSubmit()
				if("error" in result) {
					setError(result)
				}
			}}
			className='flex flex-col gap-8 justify-center items-center'
		>
			<div className='flex flex-col gap-8 max-w-[500px] w-full'>
				<Email email={email} setEmail={setEmail} id={id} />
				<Password id={id} password={password} setPassword={setPassword} />
				<Button className='w-[500px] mt-4' type='submit'>
					Login
				</Button>
				{error && <p>{error.message}</p>}
			</div>
		</form>
	)
}

export default Login
