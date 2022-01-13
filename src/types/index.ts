export type SingInStackParamList = {
	Login: undefined;
};

export type DrawerStackParamList = {
	HomeDrawer: undefined;
	Checking: undefined;
	Savings: undefined;
};

export type StepperStackParamList = {
	RootScreen: undefined;
	Stepper: undefined;
	GreatJob: undefined;
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
	DrawerStackParamList;

export type ErrorCustom = {errorMessage: string};
