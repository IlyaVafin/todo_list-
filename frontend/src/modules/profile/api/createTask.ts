import { api } from "@/shared/api/ApiHandler"
import type { Task } from "../types"

interface TaskResponse {
	message: string
	task: {
		id: string
	}
}
export const createTask = async (task: Task) => {
	await api.post<Task, TaskResponse>("/task", task)
}
