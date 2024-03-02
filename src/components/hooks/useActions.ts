import { useDispatch } from 'react-redux'
import { useMemo } from 'react'
import { bindActionCreators } from '@reduxjs/toolkit'
import { AuthSlice } from '../../store/reducers/AuthSlice'
import { CharacterSlice } from '../../store/reducers/CharacterSlice'

const rootActions = {
	...AuthSlice.actions,
	...CharacterSlice.actions
}

export const useActions = () => {
	const dispatch = useDispatch()
	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
