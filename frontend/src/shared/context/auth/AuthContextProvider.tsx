import { useQuery } from "@tanstack/react-query"
import { type ReactNode } from "react"
import { getUser } from "./api/getUser"
import { AuthContext } from "./AuthContext"

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const { data, refetch } = useQuery({
		queryFn: getUser,
		queryKey: ["user-me"],
	})
	const isAuth = data?.success ? true : false
	const user = data?.success ? data.data : null
	return (
		<AuthContext.Provider value={{ user, isAuth, checkAuth: refetch }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
