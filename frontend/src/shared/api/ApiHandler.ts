interface ResponseError {
	message: string
	error: string
	statusCode: number
	success: boolean
}

type ResponseFormApi<T> = ResponseError | { success: boolean; data: T }
class ApiHandler {
	BASE_URL = "http://localhost:3000"
	async get<T>(url: string): Promise<ResponseFormApi<T>> {
		try {
			const response = await fetch(`${this.BASE_URL}${url}`, {
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
			})
			if (!response.ok) {
				const errorData: ResponseError = await response.json()
				throw new Error(errorData.message)
			}
			const successData: T = await response.json()
			return { success: true, data: successData }
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw {
					message: error.message,
					error: error.name,
					statusCode: 0,
					success: false,
				}
			}
			throw {
				message: "Someting wrong",
				error: "Unknown error",
				statusCode: 500,
				success: false,
			}
		}
	}
	async post<T, K>(url: string, body: T): Promise<ResponseFormApi<K>> {
		try {
			const response = await fetch(`${this.BASE_URL}${url}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify(body),
			})
			if (!response.ok) {
				const errorData: ResponseError = await response.json()
        throw new Error(errorData.message)
			}
			const successData: K = await response.json()
			return { success: true, data: successData }
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw {
					message: error.message,
					error: error.name,
					statusCode: 0,
					success: false,
				}
			}
			throw {
				message: "Someting wrong",
				error: "Unknown error",
				statusCode: 500,
				success: false,
			}
		}
	}
}
export const api = new ApiHandler()
