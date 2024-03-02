import { ICharacterInfo, ICharacterUpdate, ICharacters } from '../../types'
import { apiSlice } from './apiSlice'

export const characterApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getCharacters: builder.query<ICharacters, void>({
			query: () => 'character/get'
		}),
		getCurrentCharacter: builder.query<ICharacterInfo, string>({
			query: id => ({
				url: 'character/' + id
			})
		}),
		updateCharacter: builder.mutation<ICharacterInfo | void, ICharacterUpdate>({
			query: credential => {
				return {
					url: 'character/update',
					method: 'patch',
					body: { ...credential }
				}
			}
		})
	})
})

export const createCharacter = async (data: FormData) => {
	if (!data.has('race') || !data.has('name') || !data.has('class')) {
		alert('Пожалуйста, заполните поля раса, имя персонажа и выберите его класс')
		return
	}

	const token = localStorage.getItem('token')
	if (!token) return

	const response = await fetch(
		'http://95.214.11.83:8080/api/character/create',
		{
			headers: {
				Accept: 'application/json; charset=utf-8',
				Authorization: `Bearer ${token}`
			},
			method: 'POST',
			body: data
		}
	)
		.then(response => response.json())
		.then(response => response)

	if (response) return 200
	else alert('Ошибка создания персонажа')
}

export const {
	useGetCharactersQuery,
	useGetCurrentCharacterQuery,
	useUpdateCharacterMutation
} = characterApiSlice
