import {useCallback, useState} from 'react';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from './types/redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useVisiability = (initialState: boolean): [boolean, () => void] => {
	const [isVisible, setVisibility] = useState(initialState);
	const visible = useCallback(() => setVisibility(!isVisible), [isVisible]);
	return [isVisible, visible];
};
