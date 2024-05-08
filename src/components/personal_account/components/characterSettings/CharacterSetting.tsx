import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelection'
import { ButtonSkeleton } from '../ButtonSkeleton'
import { Cube } from './components/cube/Cube'
import { Notice } from './components/notice/Notice'
import { Skills } from './components/skills/Skills'
import clsx from 'clsx'

export const CharacterSetting = () => {
	const { isInitializedData } = useTypedSelector(state => state.Character)
	const { CharacterResetCurrentInfo } = useActions()
	return (
		<div
			className={clsx(
				'transitionGeneral fixed inset-x-0 top-0 overflow-hidden m-auto z-[9999]',
				isInitializedData ? ' h-full' : 'h-0'
			)}
		>
			<div className='w-full min-h-screen overflow-y-auto flex justify-center relative overflow-hidden bg-black backdrop-blur-2xl bg-opacity-50'>
				<div className='absolute inset-x-0 top-0 bg-main w-full border-0 border-b-2 border-b-white flex justify-center z-[15]'>
					<div className='flex justify-between min-w-[1400px] max-w-[1400px] py-3'>
						<span className='text-4xl text-white'>Character Forge</span>
						<button
							className='relative bg-none outline-none border-none button w-[180px] overflow-hidden'
							onClick={() => CharacterResetCurrentInfo()}
						>
							<div className='absolute inset-0 w-full h-full'>
								<ButtonSkeleton text='Закрыть' color='#3b82f6' />
							</div>
							<div className='transitionGeneral absolute  inset-0 w-full h-full passive'>
								<ButtonSkeleton text='Закрыть' color='#fff' />
							</div>
						</button>
					</div>
				</div>

				<div className='relative flex justify-between pt-20 m-auto overflow-hidden max-w-[1400px]'>
					<Cube />
					<Skills />
					<Notice />
				</div>
			</div>
		</div>
	)
}
