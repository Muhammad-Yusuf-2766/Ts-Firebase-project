import { Button } from '@/components/ui/button'
import { BadgePlus } from 'lucide-react'

const Dashboard = () => {
	return (
		<div className='h-screen max-w-6xl mx-auto flex items-center'>
			<div className='grid grid-cols-2 w-full gap-8'>
				<div className='flex flex-col spacey-3'>
					<div className='w-full p-4 rounded-md flex justify-between bg-gradient-to-t from-background to-secondary inset-0 z-50 bg-background border-b-2'>
						<div className='text-xl font-bold'>Trainings</div>
						<Button size={'icon'}>
							<BadgePlus />
						</Button>
					</div>
					<div className='w-full p-4 rounded-md flex justify-between bg-gradient-to-b from-background to-secondary relative min-h-60'></div>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
