import './Authentication.css'
import { Background } from '../init_background/Background'
import { InputBackground } from '../../assets/svg'
import { ButtonBackground } from '../../assets/svg'

export const Authentication = () => {
	return (
		<Background>
			<div className='auth_main text-white z-20 p-4 flex items-center'>
				<div className='flex flex-col justify-between h-5/6'>
					<div className='text-center'>
						<span className='text-3xl'>Character Craft</span>
					</div>
					<div>
						<div className='mb-5'>
							<span className='ml-4 mb-2 text-lg'>Почта</span>
							<div className='relative'>
								<InputBackground />
								<input
									className='absolute inset-x-8 bottom-2 bg-transparent outline-none'
									placeholder='укажите почту...'
								/>
							</div>
							{true && <span className='errorText'>Error</span>}
						</div>
						<div>
							<span className='ml-4 mb-2 text-lg'>Пароль</span>
							<div className='relative'>
								<InputBackground />
								<input
									className='absolute inset-x-8 bottom-2 bg-transparent outline-none'
									placeholder='укажите пароль...'
								/>
							</div>
							{false && <span className='errorText'>Error</span>}
						</div>
					</div>
					<div className='flex justify-end'>
						<div className='flex gap-x-4'>
							<div className='relative w-min'>
								<ButtonBackground />
								<div className='absolute inset-x-0 text-center inset-y-2'>
									Авторизация
								</div>
							</div>
							<div className='relative w-[160px]'>
								<ButtonBackground />
								<span className='absolute inset-x-0 text-center inset-y-2'>
									Регистрация
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Background>
	)
}
