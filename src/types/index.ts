export type SingInStackParamList = {
	Login: undefined;
	ForgotPassword: undefined;
	CreateNewPassword: undefined;
	PasswordChanged: undefined;
};

export type SingUpStackParamList = {
	Registration: undefined;
	CreatePassword: undefined;
	RecoveryCode: undefined;
	Welcome: undefined;
};

export type StepperStackParamList = {
	RootScreen: undefined;
	Stepper: undefined;
	GreatJob: undefined;
};

export type TabBarStackParamList = {
	Home: undefined;
	MyPlan: undefined;
	Toolkit: undefined;
	RRScore: undefined;
	Profile: undefined;
};

export type ContainerNavigationStackParamList = {
	Dashboard: undefined;
	MindsetRating: undefined;
	Notifications: undefined;
	EditSavingPlan: undefined;
	EditSavingPlanScreen: undefined;
	PersonalInformation: undefined;
	Security: undefined;
	Token: undefined;
	PrivacyPolicy: undefined;
	RecoveryCodeProfile: undefined;
	Story: undefined;
	StoryView: {startStoryIndex: number};
} & TabBarStackParamList;

export type RootStackParamList = {
	Container: undefined;
	SignUp: undefined;
	SignIn: undefined;
	ToolkitSetup: undefined;
	Onboarding: undefined;
} & SingInStackParamList &
	SingUpStackParamList &
	StepperStackParamList &
	ContainerNavigationStackParamList;

export interface ICFormDataPassword {
	password: string;
	confirmPassword: string;
}

export interface ICFormDataPasswordChange {
	currentPassword: string;
	password: string;
	confirmPassword: string;
}

export type ErrorCustom = {errorMessage: string};
