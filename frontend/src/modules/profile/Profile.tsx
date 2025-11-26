import { api } from "@/shared/api/ApiHandler"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { Task, User } from "./types"

const Profile = () => {
	const queryClient = useQueryClient()
	const getUser = async () => {
		return await api.get<User>("/auth/me")
	}
	const { data } = useQuery({
		queryKey: ["user"],
		queryFn: getUser,
	})

	const getTasks = async () => {
		return await api.get<Task[]>("/task")
	}

	const { data: tasks } = useQuery({
		queryKey: ["tasks"],
		queryFn: getTasks,
	})

	const changeStatusTask = async (id: string, done: boolean) => {
		return await api.put<{ done: boolean }, null>(`/task/${id}`, {
			done,
		})
	}

	const { mutate: updateStatus } = useMutation({
		mutationFn: ({ id, done }) => changeStatusTask(id, done),
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

	return (
		<div>
			{data?.success && (
				<>
					<h1 className='text-4xl'>{data.data.name}</h1>
					<p>{data.data.email}</p>
				</>
			)}
			<picture>
				<source media='(max-width: 768px)' srcSet='/avatar-mobile.png' />
				<img src='/avatar.png' alt='user-avatar' />
			</picture>
			<p>Tasks</p>
			{tasks?.success && (
				<ul className='flex flex-col gap-4'>
					{tasks.data.map(task => (
						<li
							key={task.id}
							className='border border-input p-4 bg-neutral-50 rounded-xl flex justify-between'
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
							<button>
								<img className='max-w-9' src='/delete.svg' alt='' />
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default Profile
