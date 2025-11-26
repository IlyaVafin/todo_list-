export interface User {
	sub: string
	email: string
	name: string
}

export interface Task {
	title: string
	body: string
	done: boolean
	id: string
}
