import { api } from "@/shared/api/ApiHandler"

class ProfileApi {
	changeStatusTask = async (id: string, done: boolean) => {
		return await api.put<{ done: boolean }, null>(`/task/${id}`, {
			done,
		})
	}
	deleteTaskRequest = async (id: string) => {
		return await api.delete<null>(`/task/${id}`)
	}
}

export const profile = new ProfileApi()
