import { useAuthContext } from "@/shared/context/auth/useAuthContext"
import { type ReactNode } from "react"
import { Navigate } from "react-router-dom"

const RequiredAuth = ({ children }: { children: ReactNode }) => {
	const { user } = useAuthContext()
	if (!user) {
		return <Navigate to={"/"} />
	}
	return <>{children}</>
}

export default RequiredAuth
