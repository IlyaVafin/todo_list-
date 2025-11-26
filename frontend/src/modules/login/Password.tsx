import { Input } from "@/components/input/input"
import { memo } from "react"

const Password = memo(
	({
		id,
		password,
		setPassword,
	}: {
		id: string
		password: string
		setPassword: (val: string) => void
	}) => {
		return (
			<div className='flex flex-col gap-4'>
				<label htmlFor={`password_${id}`}>Password:</label>
				<Input
					value={password}
					onChange={e => setPassword(e.target.value)}
					id={`password_${id}`}
				/>
			</div>
		)
	}
)
Password.displayName = "Password"
export default Password
