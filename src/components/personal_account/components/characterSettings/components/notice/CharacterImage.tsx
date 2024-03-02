import { FC } from 'react'
import { CharacterSVG, NameFrameSVG } from '../../../../../../assets/svg'
import { useTypedSelector } from '../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../hooks/useActions'
import { IUpdatingFields } from '../../../../../../types'

interface IProps {
	imageDimension: string
	nameBlockWidth: string
	gap: string
	makeUpdateRequest: (updatingField: IUpdatingFields) => Promise<void>
}

export const CharacterImage: FC<IProps> = ({
	imageDimension,
	nameBlockWidth,
	gap,
	makeUpdateRequest
}) => {
	const { currentCharacterInfo } = useTypedSelector(state => state.Character)
	const { CharacterSaveApiResponse } = useActions()
	return (
		<div className='w-full flex flex-col'>
			<div
				className='flex justify-center relative w-full'
				style={{ marginBottom: `${gap}px` }}
			>
				<div
					style={{
						width: `${imageDimension}px`,
						height: `${imageDimension}px`
					}}
					className='relative inset-0 flex justify-center items-center rounded-full overflow-hidden imageBlock'
				>
					{!currentCharacterInfo.imageLink && (
						<>
							<CharacterSVG color='#fff' dimension={imageDimension} />
						</>
					)}
					{currentCharacterInfo.imageLink && (
						<img
							src={currentCharacterInfo.imageLink}
							style={{
								width: `${imageDimension}px`,
								height: `${imageDimension}px`
							}}
							className='h-auto rounded-full'
							alt='фотография персонажа'
						/>
					)}
				</div>
			</div>
			<NameFrameSVG width={nameBlockWidth}>
				<input
					className='outline-none border-none bg-inherit absolute inset-x-0 mx-auto text-lg inset-y-10 w-[145px] text-white p-1 z-10'
					placeholder='Имя персонажа'
					value={currentCharacterInfo.name}
					onChange={e => {
						if (/^[А-Яа-я]*$/.test(e.target.value)) {
							CharacterSaveApiResponse({
								...currentCharacterInfo,
								name: e.target.value
							})
						}
					}}
					onBlur={() => makeUpdateRequest('name')}
				/>
			</NameFrameSVG>
		</div>
	)
}
