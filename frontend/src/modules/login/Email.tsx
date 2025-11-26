import { Input } from "@/components/input/input"
import { memo } from "react"

const Email = memo(
	({
		id,
		email,
		setEmail,
	}: {
		id: string
		email: string
		setEmail: (val: string) => void
	}) => {
		return (
			<div className='flex flex-col gap-4'>
				<label htmlFor={`email_${id}`}>Email:</label>
				<Input
					value={email}
					onChange={e => setEmail(e.target.value)}
					id={`email_${id}`}
				/>
			</div>
		)
	}
)

Email.displayName = "Email"

export default Email
