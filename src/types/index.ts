export interface FormDataToPassword {
	firstName: string;
	lastName: string;
	email: string;
	birth: string;
	avatar: string;
}

export type SingInStackParamList = {
	Login: undefined;
};

export type SingUpStackParamList = {
	Registration: undefined;
	CreatePassword: {userInfo: {email: string}};
	Welcome: undefined;
};

export type DrawerStackParamList = {
	HomeDrawer: TabBarStackParamList;
	Checking: undefined;
	Savings: undefined;
	Goodness: undefined;
	Profile: undefined;
};

export type TabBarStackParamList = {
	Home: undefined;
	Accounts: undefined;
	Giving: undefined;
	Payments: undefined;
	Cards: undefined;
};

export type RootStackParamList = {
	SignIn: undefined;
	SignUp: undefined;
	DrawerNavigator: undefined;
} & SingUpStackParamList &
	SingInStackParamList &
	DrawerStackParamList &
	TabBarStackParamList;

export type ErrorCustom = {errorMessage: string};
