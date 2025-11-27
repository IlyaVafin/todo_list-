import type { User } from "@/modules/profile/types"
import { createContext } from "react"
interface IAuthContext {
	user: User | null
	isAuth: boolean
  checkAuth: () => void
}
export const AuthContext = createContext<IAuthContext | undefined>(undefined)
