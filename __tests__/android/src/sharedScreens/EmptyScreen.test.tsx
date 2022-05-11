import { cleanup, fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
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
		navigateBack: ()=>navigate('Cards'),
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

	it('Render & navigate buttonPress', async () => {
		const screen = await waitFor(() =>
			render(
				<EmptyScreen {...props}/>
			),
		);
		const btn = await screen.getByTestId('navigate-empty')
		expect(btn).toBeDefined();
		fireEvent(btn, 'press');
		screen.unmount();
	});
});
