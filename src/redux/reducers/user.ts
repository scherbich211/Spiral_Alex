import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from '../../types/userReducer';

const initialState: IUser = {
	isLoggedIn: false,
	login: {
		userName: '',
		password: '',
	},
};

export const userSlice = createSlice({
	name: 'user',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		changeUserIsLoggedIn: (state, action: PayloadAction<IUser['isLoggedIn']>) => {
			state.isLoggedIn = action.payload;
		},
		changeUserInfo: (state, action: PayloadAction<IUser['login']>) => {
			state.login = {...state.login, ...action.payload};
		},
		clearUserInfo: state => {
			state.isLoggedIn = initialState.isLoggedIn;
			state.login = initialState.login;
		},
	},
});

const {actions, reducer} = userSlice;

export const {changeUserIsLoggedIn, changeUserInfo, clearUserInfo} = actions;

export default reducer;
