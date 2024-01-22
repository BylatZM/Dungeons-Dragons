import { GradientBackground } from '../background/GradientBackground'
import { ButtonSkeleton } from './components/ButtonSkeleton'
import { CharacterCard } from './components/characterCard.tsx/CharacterCard'
import { Header } from './header/Header'
import Herald from '../../assets/images/Herald.png'
import Tris from '../../assets/images/Tris.png'
import { Curtain } from '../Curtain'
import { useState } from 'react'
import { CreatingCharacter } from './components/creatingCharacter/CreatingCharacter'

export const Account = () => {
	const [needShowFrame, changeNeedShowFrame] = useState(false)
	return (
		<>
			<Curtain needToShow={needShowFrame} />
			<CreatingCharacter
				needToShow={needShowFrame}
				changeNeedShowFrame={changeNeedShowFrame}
			/>
			<div>
				<Header />
				<GradientBackground>
					<div className='flex justify-between'>
						<span className='text-4xl text-white'>Персонажи</span>
						<button
							className='relative bg-none border-none outline-none w-[180px] h-[40px] button'
							onClick={() => changeNeedShowFrame(true)}
						>
							<div className='absolute inset-0 w-full h-full'>
								<ButtonSkeleton text='Создать персонажа' color='#3b82f6' />
							</div>
							<div className='transitionGeneral absolute  inset-0 w-full h-full passive'>
								<ButtonSkeleton text='Создать персонажа' color='#fff' />
							</div>
						</button>
					</div>
					<div className='mt-4 flex flex-wrap justify-between gap-y-4'>
						<CharacterCard
							key={1}
							image={Tris}
							grade='Маг'
							species='Человек'
							name='Трис'
						/>
						<CharacterCard
							key={2}
							image={Herald}
							grade='Мечник'
							species='Человек'
							name='Геральд'
						/>
					</div>
				</GradientBackground>
			</div>
		</>
	)
}
