export const inputChangeState = <T, K extends keyof T>(
	field: keyof T,
	value: T[K],
	set: (updater: (prev: T) => T) => void
) => {
	set((prev: T) => ({ ...prev, [field]: value }))
}
