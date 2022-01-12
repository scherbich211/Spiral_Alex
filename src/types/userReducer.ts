export interface IUser {
    isLoggedIn: boolean;
    login: {
        userName: string;
        password: string;
    }
}