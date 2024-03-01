import { ICharacters } from '../../types'
import { apiSlice } from './apiSlice'

export const characterApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getCharacters: builder.query<ICharacters, void>({
			query: () => 'character/get'
		})
	})
})

export const createCharacter = async (data: FormData) => {
	if (
		!data.has('image') ||
		!data.has('race') ||
		!data.has('name') ||
		!data.has('class')
	)
		return

	const token = localStorage.getItem('token')
	if (!token) return

	const response = await fetch(
		'http://95.214.11.83:8080/api/character/create',
		{
			headers: {
				Accept: 'application/json',
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

export const { useGetCharactersQuery } = characterApiSlice
