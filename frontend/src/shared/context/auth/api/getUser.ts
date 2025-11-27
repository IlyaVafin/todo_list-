import type { User } from "@/modules/profile/types"
import { api } from "@/shared/api/ApiHandler"

export const getUser = async () => {
	const user = api.get<User>("/auth/me")
	return user 
}
