export interface IUser {
	isLoggedIn: boolean;
	login: {
		email: string;
		password: string;
	};
}
