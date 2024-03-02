import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import AuthSlice from './reducers/AuthSlice'
import CharacterSlice from './reducers/CharacterSlice'
import { apiSlice } from './api/apiSlice'

export const store = configureStore({
	reducer: {
		Auth: AuthSlice,
		Character: CharacterSlice,
		[apiSlice.reducerPath]: apiSlice.reducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(...(process.env.NODE_ENV !== 'production' ? [logger] : []))
			.concat(apiSlice.middleware),
	devTools: true
})

export type RootState = ReturnType<typeof store.getState>
