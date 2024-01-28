import SkillBackground from '../../../../../../assets/images/SkillBackground.png'
import AbilityBackground from '../../../../../../assets/images/AbilityBackground.png'
import { Acrobatics } from './components/Acrobatics'
import { Legerdemain } from './components/Legerdemain'
import { Stealth } from './components/Stealth'

export const Dexterity = () => {
	return (
		<div className='flex gap-x-4'>
			<div className='relative w-[230px] h-[280px] flex justify-center items-center'>
				<img
					src={SkillBackground}
					className='absolute inset-0 w-full h-full pointer-events-none'
					alt='задний фон'
				/>
				<div className='flex flex-col w-full h-[70%] justify-between items-center'>
					<span className='text-xl font-bold text-white'>Ловкость</span>
					<div className='relative mx-auto py-3 pl-3 overflow-hidden border-solid border-white border-[1px] rounded-full w-[35px] h-[35px]'>
						<input
							type='number'
							onChange={e => {
								if (parseInt(e.target.value) > 30) e.target.value = '30'
							}}
							className='absolute inset-0 m-auto w-[50px] ml-3 outline-none text-lg text-white bg-inherit'
						/>
					</div>
				</div>
			</div>
			<div className='relative w-[300px] h-[280px] flex justify-center py-[8%] px-14'>
				<img
					src={AbilityBackground}
					className='absolute inset-0 w-full h-full pointer-events-none'
					alt='задний фон'
				/>
				<div className='flex flex-col gap-y-4 w-full'>
					<Acrobatics />
					<Legerdemain />
					<Stealth />
				</div>
			</div>
		</div>
	)
}
