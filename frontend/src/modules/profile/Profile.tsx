import { api } from "@/shared/api/ApiHandler"
import { useAuthContext } from "@/shared/context/auth/useAuthContext"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { profile } from "./api/ProfileApi"
import type { Task } from "./types"
import CreateTaskModal from "./ui/CreateTaskModal"

const Profile = () => {
	const queryClient = useQueryClient()

	const { user } = useAuthContext()

	const getTasks = async () => {
		return await api.get<Task[]>("/task")
	}

	const { data: tasks } = useQuery({
		queryKey: ["tasks"],
		queryFn: getTasks,
	})

	const { mutate: updateStatus } = useMutation({
		mutationFn: ({ id, done }) => profile.changeStatusTask(id, done),
		onMutate: async ({ id, done }: { id: string; done: boolean }) => {
			await queryClient.cancelQueries({ queryKey: ["tasks"] })
			const previousTasks = await queryClient.getQueryData(["tasks"])
			queryClient.setQueryData(
				["tasks"],
				(old: { success: true; data: Task[] | undefined }) => {
					return {
						...old,
						data: old.data?.map(task =>
							task.id === id ? { ...task, done } : task
						),
					}
				}
			)
			return { previousTasks }
		},
		onError: (_, __, context) => {
			queryClient.setQueryData(["tasks"], context?.previousTasks)
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] })
		},
	})

	const { mutate: deleteTask } = useMutation({
		mutationFn: (id: string) => profile.deleteTaskRequest(id),
		onMutate: async id => {
			await queryClient.cancelQueries({ queryKey: ["tasks"] })
			const previousTasks = await queryClient.getQueryData(["tasks"])
			await queryClient.setQueryData(
				["tasks"],
				(old: { success: true; data: Task[] | undefined }) => {
					return {
						...old,
						data: old.data?.filter(task => task.id !== id),
					}
				}
			)
			return { previousTasks }
		},
		onError: (_, __, context) => {
			queryClient.setQueryData(["tasks"], context?.previousTasks)
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] })
		},
	})

	return (
		<div>
			{user && (
				<>
					<h1 className='text-4xl'>{user.name}</h1>
					<p>{user.email}</p>
				</>
			)}
			<picture>
				<source media='(max-width: 768px)' srcSet='/avatar-mobile.png' />
				<img src='/avatar.png' alt='user-avatar' />
			</picture>
			<p>Tasks</p>
			{tasks?.success && (
				<div>
					<ul className='flex flex-col gap-4'>
						{tasks.data.map(task => (
							<li
								key={task.id}
								className={`p-4 bg-neutral-50 rounded-md transition-opacity flex justify-between ${
									task.done ? "opacity-50" : ""
								}`}
							>
								<div>
									<h3 className='text-2xl text-neutral-800'>{task.title}</h3>
									<p className='text-neutral-800'>{task.body}</p>
									<input
										onChange={() =>
											updateStatus({ id: task.id, done: !task.done })
										}
										type='checkbox'
										checked={task.done}
									/>
								</div>
								<button onClick={() => deleteTask(task.id)}>
									<img className='max-w-9' src='/delete.svg' alt='' />
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
			<CreateTaskModal />
		</div>
	)
}

export default Profile
