import { FC, useEffect, useRef, useState } from 'react'
import { CharacterSVG, DownloadSVG, NameFrameSVG } from '../assets/svg'

interface IProps {
	imageDimension: string
	nameBlockWidth: string
	gap: string
}

export const Character: FC<IProps> = ({
	imageDimension,
	nameBlockWidth,
	gap
}) => {
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [imageSrc, setImageSrc] = useState<string | null>(null)

	const onButtonClick = () => {
		fileInputRef.current?.click()
	}

	const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0]
		if (!file) return

		// const formData = new FormData()
		// formData.append('image', file)
		// console.log(formData.get('image'))

		if (file.type && file.type.startsWith('image/')) {
			const reader = new FileReader()
			reader.onload = event => {
				const imageSrc = event.target?.result as string
				setImageSrc(imageSrc)
			}
			reader.readAsDataURL(file)
		}
	}

	useEffect(() => {
		setImageSrc(null)
	}, [])

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
					<input
						type='file'
						accept='image/*'
						style={{ display: 'none' }}
						ref={fileInputRef}
						onChange={handleFileInputChange}
					/>
					<div className='absolute inset-0 rounded-full overflow-hidden pointer-events-none bg-gray-600 bg-opacity-20 backdrop-blur-md flex justify-center items-center image_load_curtain'>
						<DownloadSVG />
						<span className='font-bold text-white'>Загрузить</span>
					</div>
					{!imageSrc && (
						<>
							<button
								className='border-none outline-none bg-inherit'
								style={{
									width: `${imageDimension}px`,
									height: `${imageDimension}px`
								}}
								onClick={onButtonClick}
							>
								<CharacterSVG color='#fff' dimension={imageDimension} />
							</button>
						</>
					)}
					{imageSrc && (
						<button
							className='border-none outline-none bg-inherit'
							style={{
								width: `${imageDimension}px`,
								height: `${imageDimension}px`
							}}
							onClick={onButtonClick}
						>
							<img
								src={imageSrc}
								style={{
									maxWidth: `100%`,
									height: `auto`
								}}
								className='h-auto rounded-full'
								alt='фотография персонажа'
							/>
						</button>
					)}
				</div>
			</div>
			<NameFrameSVG width={nameBlockWidth}>
				<input
					className='outline-none border-none bg-inherit absolute inset-x-0 mx-auto text-lg inset-y-10 w-[145px] text-white p-1 z-10'
					placeholder='Имя персонажа'
				/>
			</NameFrameSVG>
		</div>
	)
}
