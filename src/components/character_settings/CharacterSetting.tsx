import { GradientBackground } from '../background/GradientBackground'
import { Header } from '../header/Header'
import { Cube } from './components/cube/Cube'
import { Notice } from './components/notice/Notice'
import { Skills } from './components/skills/Skills'

export const CharacterSetting = () => {
	return (
		<>
			<GradientBackground>
				<Cube />
				<div className='w-full min-h-screen overflow-y-auto flex justify-center'>
					<Header />
					<div className='flex justify-between pt-20 m-auto overflow-hidden min-w-[1400px] max-w-[1400px]'>
						<Skills />
						<Notice />
					</div>
				</div>
			</GradientBackground>
		</>
	)
}
