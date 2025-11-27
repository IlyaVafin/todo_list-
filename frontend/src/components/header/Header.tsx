import { useAuthContext } from "@/shared/context/auth/useAuthContext"
import { Link } from "react-router-dom"
const Header = () => {
	const { isAuth } = useAuthContext()
	return (
		<header className='flex justify-between pt-5 pb-5'>
			<div>
				<p>Todo-list</p>
			</div>
			<nav>
				<ul className='flex gap-12'>
					<li>
						<Link className='text-neutral-900' to='/'>
							Home
						</Link>
					</li>
					{!isAuth && (
						<>
							<li>
								<Link className='text-neutral-900' to='/login'>
									Login
								</Link>
							</li>
							<li>
								<Link className='text-neutral-900' to='/register'>
									Register
								</Link>
							</li>
						</>
					)}
					{isAuth && (
						<li>
							<Link className='text-neutral-900' to='/profile'>
								Profile
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</header>
	)
}

export default Header
