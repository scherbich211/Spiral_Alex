import { act, cleanup, fireEvent, render, waitFor } from "@testing-library/react-native";
import { changeUserInfo, changeUserIsLoggedIn } from "../../../../../src/redux/reducers/user";
import store from "../../../../../src/redux/store";
import { renderWithRouter } from "./helper";


jest.mock('react-native', function () {
	const reactNative = jest.requireActual('react-native');
	jest.spyOn(reactNative.Platform, 'select').mockImplementation(() => 'android');
	reactNative.Platform.OS = 'android';
	return reactNative;
});

describe('Sign In Screen', () => {
	const dataToChange = {email: '', password: ''};

	afterEach(cleanup);

	afterEach(async () => {
		await act(async () => store.dispatch(changeUserInfo(dataToChange)));
		await act(async () => store.dispatch(changeUserIsLoggedIn(false)));
	});

    beforeAll(async () => {
        await act(async () => store.dispatch(changeUserInfo(dataToChange)));
		await act(async () => store.dispatch(changeUserIsLoggedIn(false)));
    })

    it('Render', async () => {
		const LoginScreen = await waitFor(() =>
			render(
                renderWithRouter(null, 'SignIn')
			),
		);
		// expect(EmailScreen).toMatchSnapshot();
		LoginScreen.unmount();
	});

    it('Render & rigth input', async () => {
        const LoginScreen = await waitFor(() =>
			render(
                renderWithRouter(null, 'SignIn')
			),
		);
		const email = LoginScreen.getByTestId('email-input');
		const password = LoginScreen.getByTestId('password-input');
		const btn = LoginScreen.getByTestId('login-btn')
		act(() => fireEvent.changeText(email, 'a@itechart-group.com'));
		await act(async () => fireEvent(email, 'blur'));
		act(() => fireEvent.changeText(password, 'Sasha@211'));
		await act(async () => fireEvent(password, 'blur'));
		expect(btn).not.toBeDisabled();
		LoginScreen.unmount();
	});

	it('Render & wrong input ', async () => {
        const LoginScreen = await waitFor(() =>
			render(
                renderWithRouter(null, 'SignIn')
			),
		);
		const email = LoginScreen.getByTestId('email-input');
		const password = LoginScreen.getByTestId('password-input');
		const btn = LoginScreen.getByTestId('login-btn')
		act(() => fireEvent.changeText(email, 'a@itechart-group'));
		await act(async () => fireEvent(email, 'blur'));
		act(() => fireEvent.changeText(password, 'Sasha@211'));
		await act(async () => fireEvent(password, 'blur'));
		expect(btn).toBeDisabled();
		LoginScreen.unmount();
	});

	it('Render & press register', async () => {
        const LoginScreen = await waitFor(() =>
			render(
                renderWithRouter(null, 'SignIn')
			),
		);
		const btn = LoginScreen.getByText('Register here')
		expect(btn).not.toBeDisabled();
		fireEvent.press(btn);
		const newHeader = LoginScreen.getByText('Registration');
		expect(newHeader).toBeDefined();
		LoginScreen.unmount();
	});

    it('Render & onSubmit', async () => {
        const LoginScreen = await waitFor(() =>
        render(
            renderWithRouter(null, 'SignIn')
        ),
    );
        const email = LoginScreen.getByTestId('email-input');
        const password = LoginScreen.getByTestId('password-input');
        const btn = LoginScreen.getByTestId('login-btn')
        act(() => fireEvent.changeText(email, 'a@itechart-group.com'));
        await act(async () => fireEvent(email, 'blur'));
        act(() => fireEvent.changeText(password, 'Sasha@211'));
        await act(async () => fireEvent(password, 'blur'));
        expect(btn).not.toBeDisabled();
        await act(async () => fireEvent.press(btn));
        expect(store.getState().user.isLoggedIn).toEqual(true);
        expect(store.getState().user.login).toEqual({email: 'a@itechart-group.com', password: 'Sasha@211'});
        LoginScreen.unmount();
	});
});

