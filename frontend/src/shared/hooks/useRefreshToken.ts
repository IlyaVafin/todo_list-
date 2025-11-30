import { useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "../api/ApiHandler"
import { useAuthContext } from "../context/auth/useAuthContext"

export const useRefreshToken = () => {
	const refreshToken = async () => {
		return await api.get<{ message: string }>("/auth/refresh")
	}
	const { isAuth } = useAuthContext()
	const queryClient = useQueryClient()
	const { isSuccess } = useQuery({
		queryKey: ["refresh-token"],
		queryFn: refreshToken,
		refetchInterval: isAuth ? 1000 * 60 * 15 : false,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 15,
		refetchOnWindowFocus: false,
		refetchIntervalInBackground: true,
		enabled: !isAuth,
	})
	if (isSuccess) {
		queryClient.invalidateQueries({ queryKey: ["refresh-token"] })
	}
}
