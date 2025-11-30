import { Button } from "@/components/button/button"
import { Input } from "@/components/input/input"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import type { Task } from "../types"
import { inputChangeState } from "@/shared/utils/inputChangeState"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTask } from "../api/createTask"

const CreateTaskModal = () => {
	const [newTask, setNewTask] = useState<Task>({
		body: "",
		done: false,
		title: "",
	})
	const queryClient = useQueryClient()
	const { data, mutate, isPending } = useMutation({
		mutationFn: createTask,
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] })
			setNewTask({
				body: "",
				done: false,
				title: "",
			})
		},
	})
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button type='button' className='mt-4' variant={"destructive"}>
					Добавить задачу +{" "}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<form
					className='flex flex-col gap-4'
					onSubmit={e => {
						e.preventDefault()
						mutate(newTask)
					}}
				>
					<DialogHeader>
						<DialogTitle>Create new task</DialogTitle>

						<DialogDescription>Make your own task!</DialogDescription>
					</DialogHeader>
					<div className='flex flex-col gap-2'>
						<label htmlFor='title-task'>Title:</label>
						<Input
							onChange={e =>
								inputChangeState("title", e.target.value, setNewTask)
							}
							id='title-task'
						/>
					</div>
					<div className='flex flex-col gap-2'>
						<label htmlFor='description-task'>Description:</label>
						<Input
							onChange={e =>
								inputChangeState("body", e.target.value, setNewTask)
							}
							id='description-task'
						/>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant='outline'>Close</Button>
						</DialogClose>
						<Button disabled={isPending} type='submit'>
							Create
						</Button>
					</DialogFooter>
					{data && data.success && (
						<DialogDescription className="text-green-400">{data.data.message}</DialogDescription>
					)}
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default CreateTaskModal
