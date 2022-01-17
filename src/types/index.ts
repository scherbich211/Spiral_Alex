export type SingInStackParamList = {
	Login: undefined;
};

export type DrawerStackParamList = {
	HomeDrawer: TabBarStackParamList;
	Checking: undefined;
	Savings: undefined;
	Goodness: undefined;
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
	DrawerNavigator: undefined;
} & SingInStackParamList &
	DrawerStackParamList &
	TabBarStackParamList;

export type ErrorCustom = {errorMessage: string};
