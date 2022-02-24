export interface User {
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
