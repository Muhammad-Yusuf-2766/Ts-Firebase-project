import TaskForm from '@/components/forms/taskform'
import FillLoading from '@/components/shared/fill-laoding'
import TaskItem from '@/components/shared/task-item'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { db } from '@/firebase'
import { taskSchema } from '@/lib/vatidation'
import { TaskService } from '@/service/task.service'
import { useUserState } from '@/stores/user.auth.store'
import { ITask } from '@/types'
import { useQuery } from '@tanstack/react-query'
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	updateDoc,
} from 'firebase/firestore'
import { AlertCircle, BadgePlus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

const Dashboard = () => {
	const [openAddTask, setOpenAddTask] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const [currentTask, setCurrentTask] = useState<ITask | null>(null)
	const { user } = useUserState()

	const { isPending, error, data, refetch } = useQuery({
		queryKey: ['tasks-data'],
		queryFn: TaskService.getTasks,
	})

	const onAdd = async ({ title }: z.infer<typeof taskSchema>) => {
		if (!user) return null
		return addDoc(collection(db, 'tasks'), {
			title,
			status: 'unstarted',
			startTime: null,
			endTime: null,
			userId: user.uid,
		})
			.then(() => refetch())
			.finally(() => setOpenAddTask(false))
	}

	const onUpdate = async ({ title }: z.infer<typeof taskSchema>) => {
		if (!user) return null
		if (!currentTask) return null
		const ref = doc(db, 'tasks', currentTask.id)
		return updateDoc(ref, {
			title,
		})
			.then(() => refetch())
			.finally(() => setIsEditing(false))
			.catch(e => alert(e))
	}

	const onDelete = async (id: string) => {
		setIsDeleting(true)
		const promise = deleteDoc(doc(db, 'tasks', id))
			.then(() => refetch())
			.finally(() => setIsDeleting(false))
			.catch(e => alert(e))

		toast.promise(promise, {
			loading: 'Loading..>>>',
			success: 'Task deleted successfully!',
			error: 'Something worng :(',
		})
	}

	const onStartEditing = (task: ITask) => {
		setIsEditing(true)
		setCurrentTask(task)
	}

	return (
		<>
			<div className='h-screen max-w-6xl mx-auto flex items-center'>
				<div className='grid grid-cols-2 w-full gap-8 items-center'>
					<div className='h-[350px] flex flex-col space-y-3'>
						<div className='w-full p-4 rounded-md flex justify-between bg-gradient-to-t from-background to-secondary inset-0 z-50 bg-background border-b-2'>
							<div className='text-xl font-bold'>Trainings</div>
							<Button size={'icon'} onClick={() => setOpenAddTask(true)}>
								<BadgePlus />
							</Button>
						</div>
						<div className='w-full p-4 rounded-md flex justify-between bg-gradient-to-b from-background to-secondary relative min-h-60'>
							{(isPending || isDeleting) && <FillLoading />}
							{error && (
								<Alert variant='destructive' className='w-full'>
									<AlertCircle className='h-4 w-4' />
									<AlertTitle>Error</AlertTitle>
									<AlertDescription>{error.message}</AlertDescription>
								</Alert>
							)}

							{data && (
								<div
									className='w-full overflow-auto flex flex-col space-y-3'
									style={{
										scrollbarWidth: 'none' /* Firefox */,
										msOverflowStyle: 'none' /* IE and Edge */,
									}}
								>
									{!isEditing &&
										data.tasks.map(task => (
											<TaskItem
												key={task.id}
												task={task}
												onStartEditing={() => onStartEditing(task)}
												onDelete={() => onDelete(task.id)}
												refetch={refetch}
											/>
										))}
									{isEditing && (
										<div className='px-2 py-4'>
											<TaskForm
												title={currentTask?.title}
												isEdit={true}
												onClose={() => setIsEditing(false)}
												handler={
													onUpdate as (
														values: z.infer<typeof taskSchema>
													) => Promise<void | null>
												}
											/>
										</div>
									)}
								</div>
							)}
						</div>
					</div>

					<div className='flex flex-col space-y-3 w-full'>
						<div className='p-4 rounded-md bg-gradient-to-tr from-blue-900 to-background relative h-24'>
							<div className='text-2xl font-bold'>Total week</div>
							<div className='text-3xl font-bold'>05:44:31</div>
						</div>
						<div className='p-4 rounded-md bg-gradient-to-tr from-secondary to-background relative h-24'>
							{' '}
							<div className='text-2xl font-bold'>Total week</div>
							<div className='text-3xl font-bold'>05:44:31</div>
						</div>
						<div className='p-4 rounded-md bg-gradient-to-tr from-destructive to-background relative h-24'>
							{' '}
							<div className='text-2xl font-bold'>Total week</div>
							<div className='text-3xl font-bold'>05:44:31</div>
						</div>
					</div>
				</div>
			</div>
			<Dialog open={openAddTask} onOpenChange={setOpenAddTask}>
				{/* <DialogTrigger></DialogTrigger> */}
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create a new task</DialogTitle>
					</DialogHeader>
					<Separator />
					<TaskForm
						handler={
							onAdd as (
								values: z.infer<typeof taskSchema>
							) => Promise<void | null>
						}
					/>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default Dashboard
