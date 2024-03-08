import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ICharacterGrade, ICharacterInfo, ICharacterState } from '../../types'

const initialGrades: ICharacterGrade[] = [
	'Бард',
	'Жрец',
	'Друид',
	'Монах',
	'Плут',
	'Колдун',
	'Варвар',
	'Воин',
	'Следопыт',
	'Паладин',
	'Чародей',
	'Волшебник'
]

const defaultCharacterInfo: ICharacterInfo = {
	id: 0,
	userId: 0,
	name: '',
	characterClass: 'Бард',
	race: '',
	imageLink: '',
	lvl: 0,
	experience: 0,
	health: 0,
	strength: 0,
	physique: 0,
	dexterity: 0,
	wisdom: 0,
	intelligence: 0,
	charisma: 0,
	notes: '',
	modifiers: {
		id: 0,
		athletics: 0,
		acrobatics: 0,
		sleightOfHand: 0,
		stealth: 0,
		perception: 0,
		survival: 0,
		medicine: 0,
		insight: 0,
		animalCare: 0,
		analysis: 0,
		history: 0,
		magic: 0,
		nature: 0,
		religion: 0,
		performance: 0,
		intimidation: 0,
		fraud: 0,
		conviction: 0
	}
}

const initialState: ICharacterState = {
	currentCharacterInfo: defaultCharacterInfo,
	characterClasses: initialGrades,
	isInitializedData: false
}

export const CharacterSlice = createSlice({
	name: 'Character',
	initialState,
	reducers: {
		CharacterSaveApiResponse: (
			state,
			{ payload }: PayloadAction<ICharacterInfo>
		) => {
			state.currentCharacterInfo = payload
			state.isInitializedData = true
		},
		CharacterResetCurrentInfo: (state): ICharacterState => {
			return {
				...state,
				currentCharacterInfo: defaultCharacterInfo,
				isInitializedData: false
			}
		},
		CharacterClear: (state): ICharacterState => {
			return initialState
		}
	}
})

export const {
	CharacterSaveApiResponse,
	CharacterClear,
	CharacterResetCurrentInfo
} = CharacterSlice.actions

export default CharacterSlice.reducer
