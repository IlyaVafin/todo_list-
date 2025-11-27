import { Button } from "@/components/button/button"
import { Input } from "@/components/input/input"
import { api } from "@/shared/api/ApiHandler"
import { useMutation } from "@tanstack/react-query"
import { useId, useState } from "react"
import { useNavigate } from "react-router-dom"
interface RegisterData {
	name: string
	email: string
	password: string
	confirmPassword: string
}
type RegisterUser = Pick<RegisterData, "name" | "email" | "password">
const Register = () => {
	const id = useId()
	const [register, setRegister] = useState<RegisterData>({
		confirmPassword: "",
		email: "",
		name: "",
		password: "",
	})
	const navigate = useNavigate()
	const signUp = async (user: RegisterUser) => {
		return await api.post<RegisterUser, { success: boolean }>("/user", user)
	}
	const handleChange = (field: string, value: string) => {
		setRegister(prev => ({ ...prev, [field]: value }))
	}
	const { isPending, mutate } = useMutation({
		mutationFn: signUp,
		mutationKey: ["user-register"],
		gcTime: 0,
		onSettled: data => {
			if (data?.success) {
				navigate("/login")
			}
		},
	})
	return (
		<form
			onSubmit={e => {
				e.preventDefault()
				mutate({
					email: register.email,
					name: register.name,
					password: register.password,
				})
			}}
			className='flex justify-center items-center'
		>
			<div className='flex flex-col gap-4 max-w-[350px] w-full border border-neutral-700 p-10 rounded-2xl'>
				<div className='flex flex-col gap-2'>
					<label htmlFor={`name_${id}`}>Name:</label>
					<Input
						onChange={e => handleChange("name", e.target.value)}
						value={register.name}
						id={`name_${id}`}
						placeholder='John Doe'
						autoComplete='username'
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<label htmlFor={`email_${id}`}>Email:</label>
					<Input
						onChange={e => handleChange("email", e.target.value)}
						value={register.email}
						id={`email_${id}`}
						placeholder='example@gmail.com'
						autoComplete='email'
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<label htmlFor={`password_${id}`}>Password</label>
					<Input
						onChange={e => handleChange("password", e.target.value)}
						value={register.password}
						type='password'
						id={`password_${id}`}
						placeholder='Password'
						autoComplete='new-password'
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<label htmlFor={`confirm_password_${id}`}>Confirm password</label>
					<Input
						onChange={e => handleChange("confirmPassword", e.target.value)}
						value={register.confirmPassword}
						type='password'
						id={`confirm_password_${id}`}
						placeholder='Confirm password'
						autoComplete='current-password'
					/>
				</div>
				<div className='flex justify-center w-full'>
					<Button className='mt-2' disabled={isPending}>
						{isPending ? "Please wait..." : "Sign up"}
					</Button>
				</div>
			</div>
		</form>
	)
}

export default Register
