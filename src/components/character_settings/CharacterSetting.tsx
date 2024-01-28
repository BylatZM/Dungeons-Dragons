import { GradientBackground } from '../background/GradientBackground'
import { Header } from '../header/Header'
import { Notice } from './components/notice/Notice'
import { Skills } from './components/skills/Skills'

export const CharacterSetting = () => {
	return (
		<div className='w-full min-h-screen overflow-y-auto'>
			<Header />
			<GradientBackground>
				<div className='flex justify-between'>
					<Skills />
					<Notice />
				</div>
			</GradientBackground>
		</div>
	)
}
