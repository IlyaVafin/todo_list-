import { useContext } from "react"
import { AuthContext } from "./AuthContext"

export const useAuthContext = () => {
	const ctx = useContext(AuthContext)
	if (!ctx) throw new Error("AuthContext must be use with AuthContextProvider!")
	return ctx
}
