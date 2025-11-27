import { Button } from "@/components/button/button"
import { Input } from "@/components/input/input"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog"

const CreateTaskModal = () => {
	return (
		<Dialog>
			<form action=''>
				<DialogTrigger asChild>
					<Button type='button' className='mt-4' variant={"destructive"}>
						Добавить задачу +{" "}
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<p>Create new task</p>
					</DialogHeader>
					<DialogDescription>
						<p>Make your own task!</p>
					</DialogDescription>
					<div className=''>
						<label htmlFor='title-task'>Title:</label>
						<Input id='title-task' />
					</div>
					<div className=''>
						<label htmlFor='description-task'>Description:</label>
						<Input id='description-task' />
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant='outline'>Close</Button>
						</DialogClose>
						<Button type='submit'>Create</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	)
}

export default CreateTaskModal
