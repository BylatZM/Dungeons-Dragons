import { Physique } from './components/Physique'
import { Power } from './components/Power'
import { Charisma } from './components/charisma/Charisma'
import { Dexterity } from './components/dexterity/Dexterity'
import { Intelligence } from './components/intelligence/Intelligence'
import { Wisdom } from './components/wisdom/Wisdom'

export const Skills = () => {
	const calculateNewValueConsiderBonus = (
		modifierValue: string,
		bonusValue: number
	): string => {
		let parsedModifier = parseInt(modifierValue)
		if (isNaN(parsedModifier)) return '0'

		if (bonusValue === 0) parsedModifier -= 4
		else parsedModifier += 2

		if (parsedModifier > 10) return '10'
		if (parsedModifier < -10) return '-10'

		return parsedModifier.toString()
	}

	return (
		<div className='flex flex-wrap justify-between min-w-[410px] max-w-[410px] h-fit '>
			<div className='flex flex-col h-fit w-fit'>
				<Power
					calculateNewValueConsiderBonus={calculateNewValueConsiderBonus}
				/>
				<Charisma
					calculateNewValueConsiderBonus={calculateNewValueConsiderBonus}
				/>
				<Intelligence
					calculateNewValueConsiderBonus={calculateNewValueConsiderBonus}
				/>
			</div>
			<div className='flex flex-col h-fit w-fit'>
				<Physique />
				<Wisdom
					calculateNewValueConsiderBonus={calculateNewValueConsiderBonus}
				/>
				<Dexterity
					calculateNewValueConsiderBonus={calculateNewValueConsiderBonus}
				/>
			</div>
		</div>
	)
}
