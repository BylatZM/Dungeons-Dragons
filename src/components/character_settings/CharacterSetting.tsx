import { GradientBackground } from '../background/GradientBackground'
import { Header } from '../header/Header'
import { Cube } from './components/cube/Cube'
import { Notice } from './components/notice/Notice'
import { Skills } from './components/skills/Skills'

export const CharacterSetting = () => {
	return (
		<>
			<Cube />
			<div className='w-full min-h-screen overflow-y-auto'>
				<Header />
				<GradientBackground>
					<div className='flex justify-between'>
						<Skills />
						<Notice />
					</div>
				</GradientBackground>
			</div>
		</>
	)
}
