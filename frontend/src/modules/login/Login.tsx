import { Button } from "@/components/button/button"
import Email from "./ui/Email"
import Password from "./ui/Password"
import { useLogin } from "./hooks/useLogin"

const Login = () => {
	const { error, id, isError, isPending, mutate, setEmail, setPassword, email, password } =
		useLogin()
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
				{isError && <p>{error?.message}</p>}
			</div>
		</form>
	)
}

export default Login
