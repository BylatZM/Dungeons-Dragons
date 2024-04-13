import { GradientBackground } from '../background/GradientBackground'
import { ButtonSkeleton } from './components/ButtonSkeleton'
import { CharacterCard } from './components/characterCard/CharacterCard'
import { Header } from '../header/Header'
import { useEffect, useState } from 'react'
import { CreatingCharacter } from './components/creatingCharacter/CreatingCharacter'
import { useGetCharactersQuery } from '../../store/api/characterApiSlice'
import { Loading } from '../loading/Loading'
import { useTypedSelector } from '../hooks/useTypedSelection'
import { CharacterSetting } from './components/characterSettings/CharacterSetting'

export const Account = () => {
	const { isInitializedData } = useTypedSelector(state => state.Character)
	const [needShowCreatingForm, changeNeedShowCreatingForm] = useState(false)
	const { isLoading, data: characters, refetch } = useGetCharactersQuery()
	const [isInitialLoading, changeIsInitialLoading] = useState(true)

	useEffect(() => {
		document.documentElement.style.overflowX = 'hidden'
		if (isInitializedData) document.documentElement.style.overflowY = 'hidden'
		else document.documentElement.style.overflowY = 'auto'
	}, [isInitializedData])

	useEffect(() => {
		if (!needShowCreatingForm && !isInitializedData) refetch()
	}, [needShowCreatingForm, isInitializedData])

	useEffect(() => {
		if (characters) changeIsInitialLoading(false)
	}, [characters])

	if (isInitialLoading) return <Loading />

	return (
		<>
			<CreatingCharacter
				needToShow={needShowCreatingForm}
				changeNeedShowFrame={changeNeedShowCreatingForm}
			/>
			<CharacterSetting />
			<Header />
			<GradientBackground>
				<div className='min-w-[1400px] max-w-[1400px] pt-40 pb-40 mx-auto'>
					<div className='flex justify-between'>
						<span className='text-4xl text-white'>Персонажи</span>
						{!isLoading && (
							<button
								className='relative bg-none border-none outline-none w-[180px] h-[40px] button'
								onClick={() => {
									changeNeedShowCreatingForm(true)
									document.documentElement.style.overflowY = 'hidden'
								}}
							>
								<div className='absolute inset-0 w-full h-full'>
									<ButtonSkeleton text='Создать персонажа' color='#3b82f6' />
								</div>
								<div className='transitionGeneral absolute  inset-0 w-full h-full passive'>
									<ButtonSkeleton text='Создать персонажа' color='#fff' />
								</div>
							</button>
						)}
					</div>
					<div
						className='mt-12 w-full flex flex-wrap gap-y-8 gap-x-4'
						style={{
							justifyContent:
								characters && characters.characters.length > 2
									? 'space-between'
									: 'flex-start'
						}}
					>
						{characters &&
							characters.characters.map((el, index) => (
								<CharacterCard
									key={index}
									image={el.imageLink}
									grade={el.characterClass}
									race={el.race}
									name={el.name}
									character_id={
										el.characterLink.split('/')[
											el.characterLink.split('/').length - 1
										]
									}
								/>
							))}
					</div>
				</div>
			</GradientBackground>
		</>
	)
}
