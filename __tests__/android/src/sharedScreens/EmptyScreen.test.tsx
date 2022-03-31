import { NavigationContainer } from "@react-navigation/native";
import { cleanup, render, waitFor } from "@testing-library/react-native";
import React from "react";
import DrawerNavigator from "../../../../src/screens/HomeScreens/Drawer";
import EmptyScreen from "../../../../src/sharedScreens/EmptyScreen";
import { navigate } from "../../../../src/utils/navigateRef";


jest.mock('react-native', function () {
	const reactNative = jest.requireActual('react-native');
	jest.spyOn(reactNative.Platform, 'select').mockImplementation(() => 'android');
	reactNative.Platform.OS = 'android';
	return reactNative;
});

describe('Empty Screen', () => {
	afterEach(cleanup);
	const props = {
		title: 'Accounts',
		navigateBack: ()=>navigate('Home'),
		screenName: 'Accounts',
	  };

	it('Render', async () => {
		const screen = await waitFor(() =>
			render(<EmptyScreen {...props}/>),
		);
		expect(screen).toBeDefined();
		expect(screen).toMatchSnapshot();
		screen.unmount();
	});

	it('Render & screenName', async () => {
		const screen = await waitFor(() =>
			render(<EmptyScreen {...props}/>),
		);
		const screenName = await screen.getByTestId('test-screenName')
		expect(screenName).toBeDefined();
		expect(screenName).toHaveTextContent('Accounts')
		expect(screen).toMatchSnapshot();
		screen.unmount();
	});

	it('Render & title', async () => {
		const screen = await waitFor(() =>
			render(<EmptyScreen {...props}/>),
		);
		const title = await screen.getByTestId('header')
		expect(title).toBeDefined();
		expect(screen).toMatchSnapshot();
		screen.unmount();
	});

	// it('Render & navigate', async () => {
	// 	const screen = await waitFor(() =>
	// 		render(
	// 			<NavigationContainer>
	// 				<DrawerNavigator />
	// 			</NavigationContainer>
	// 		),
	// 	);
	// 	const navigate = await screen.getByTestId('navigate-empty')
	// 	expect(navigate).toBeTruthy();
	// 	expect(screen).toMatchSnapshot();
	// 	screen.unmount();
	// });
});
