import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface User {
	id: number;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	birth: string;
	avatar: string;
}

export interface IUsers {
	users: User[];
}

const initialState: IUsers = {
	users: [],
};

export const databaseSlice = createSlice({
	name: 'database',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		changeUsersData: (state, action: PayloadAction<IUsers['users']>) => {
			state.users = action.payload;
		},
	},
});

const {actions, reducer} = databaseSlice;

export const {changeUsersData} = actions;

export default reducer;
