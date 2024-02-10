import { GradientBackground } from '../background/GradientBackground'
import { ButtonSkeleton } from './components/ButtonSkeleton'
import { CharacterCard } from './components/characterCard.tsx/CharacterCard'
import { Header } from '../header/Header'
import Person1 from '../../assets/images/Person1.png'
import Person2 from '../../assets/images/Person2.png'
import Person3 from '../../assets/images/Person3.png'
import Person4 from '../../assets/images/Person4.png'
import Person5 from '../../assets/images/Person5.png'
import Person6 from '../../assets/images/Person6.png'
import Person7 from '../../assets/images/Person7.png'
import Person8 from '../../assets/images/Person8.png'
import Person9 from '../../assets/images/Person9.png'
import { useState } from 'react'
import { CreatingCharacter } from './components/creatingCharacter/CreatingCharacter'

export const Account = () => {
	const [needShowFrame, changeNeedShowFrame] = useState(false)
	return (
		<>
			<CreatingCharacter
				needToShow={needShowFrame}
				changeNeedShowFrame={changeNeedShowFrame}
			/>
			<Header />
			<GradientBackground>
				<div className='min-w-[1400px] max-w-[1400px] pt-40 mx-auto'>
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
					<div className='mt-12 w-fit flex flex-wrap gap-y-8 justify-between'>
						<CharacterCard
							key={1}
							image={Person1}
							grade='Маг'
							species='Человек'
							name='Трис'
						/>
						<CharacterCard
							key={2}
							image={Person2}
							grade='Маг'
							species='Человек'
							name='Трис'
						/>
						<CharacterCard
							key={3}
							image={Person3}
							grade='Маг'
							species='Человек'
							name='Трис'
						/>
						<CharacterCard
							key={4}
							image={Person4}
							grade='Маг'
							species='Человек'
							name='Трис'
						/>
						<CharacterCard
							key={5}
							image={Person5}
							grade='Маг'
							species='Человек'
							name='Трис'
						/>
						<CharacterCard
							key={6}
							image={Person6}
							grade='Маг'
							species='Человек'
							name='Трис'
						/>
						<CharacterCard
							key={7}
							image={Person7}
							grade='Маг'
							species='Человек'
							name='Трис'
						/>
						<CharacterCard
							key={8}
							image={Person8}
							grade='Маг'
							species='Человек'
							name='Трис'
						/>
						<CharacterCard
							key={9}
							image={Person9}
							grade='Маг'
							species='Человек'
							name='Трис'
						/>
					</div>
				</div>
			</GradientBackground>
		</>
	)
}
