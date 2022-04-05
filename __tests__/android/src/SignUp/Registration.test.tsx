import { act, cleanup, fireEvent, render, waitFor } from "@testing-library/react-native";
import { renderWithRouter } from "./helper";


jest.mock('react-native', function () {
	const reactNative = jest.requireActual('react-native');
	jest.spyOn(reactNative.Platform, 'select').mockImplementation(() => 'android');
	reactNative.Platform.OS = 'android';
	return reactNative;
});

describe('Empty Screen', () => {
	afterEach(cleanup);
    it('Render', async () => {
		const SignUpScreen = await waitFor(() =>
			render(
                renderWithRouter(null, 'Registration')
			),
		);
		// expect(SignUpScreen).toMatchSnapshot();
		SignUpScreen.unmount();
	});

    it('Render & input', async () => {
        const SignUpScreen = await waitFor(() =>
			render(
                renderWithRouter(null, 'Registration')
			),
		);
		act(() => fireEvent.changeText(SignUpScreen.getByTestId('email-input'), 'a@itechart-group.com'));
		await waitFor(() => fireEvent(SignUpScreen.getByTestId('email-input'), 'blur'));
		expect(SignUpScreen.getByTestId('btn-next-registration')).not.toBeDisabled();
	});
});