import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { IProfile } from '../../types/profileReducer';

const initialState: IProfile = {
	userInfo: {
		name: '',
		birth: '',
	},
	avatar: '',
	darkMode: false,
};

export const profileSlice = createSlice({
	name: 'profile',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		clearProfileInfo: state => {
			state.userInfo = initialState.userInfo;
		},
		changeAvatarRedux: (state, action: PayloadAction<IProfile['avatar']>) => {
			state.avatar = action.payload;
		},
		changeDarkMode: (state, action: PayloadAction<IProfile['darkMode']>) => {
			state.darkMode = action.payload;
		},
		changeProfileInfo: (state, action: PayloadAction<IProfile['userInfo']>) => {
			state.userInfo = {...state.userInfo, ...action.payload};
		},
	},
});

const {actions, reducer} = profileSlice;

export const {
	clearProfileInfo,
	changeAvatarRedux,
	changeDarkMode,
	changeProfileInfo
} = actions;

export default reducer;
