import { act, cleanup, fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";
import { AuthProvider } from "../../../../../src/AuthProvider";
import { changeUserInfo, changeUserIsLoggedIn } from "../../../../../src/redux/reducers/user";
import store from "../../../../../src/redux/store";
import CreatePassword from "../../../../../src/screens/SignUp/Password";
import { renderWithRouter } from "./helper";


jest.mock('react-native', function () {
	const reactNative = jest.requireActual('react-native');
	jest.spyOn(reactNative.Platform, 'select').mockImplementation(() => 'android');
	reactNative.Platform.OS = 'android';
	return reactNative;
});

describe('Email Screen', () => {
	afterEach(cleanup);
    it('Render', async () => {
		const EmailScreen = await waitFor(() =>
			render(
                renderWithRouter(null, 'Registration')
			),
		);
		// expect(EmailScreen).toMatchSnapshot();
		EmailScreen.unmount();
	});

    it('Render & rigth input', async () => {
        const EmailScreen = await waitFor(() =>
			render(
                renderWithRouter(null, 'Registration')
			),
		);
		const text = EmailScreen.getByTestId('email-input');
		const btn = EmailScreen.getByTestId('btn-next-registration')
		act(() => fireEvent.changeText(text, 'a@itechart-group.com'));
		await act(async () => fireEvent(text, 'blur'));
		expect(btn).not.toBeDisabled();
		EmailScreen.unmount();
	});

	it('Render & wrong input ', async () => {
        const EmailScreen = await waitFor(() =>
			render(
                renderWithRouter(null, 'Registration')
			),
		);
		const text = EmailScreen.getByTestId('email-input');
		const btn = EmailScreen.getByTestId('btn-next-registration')
		act(() => fireEvent.changeText(text, '123'));
		await act(async () => fireEvent(text, 'blur'));
		expect(btn).toBeDisabled();
		EmailScreen.unmount();
	});

	it('Render & rigth input & next page', async () => {
        const EmailScreen = await waitFor(() =>
			render(
                renderWithRouter(null, 'Registration')
			),
		);
		const text = EmailScreen.getByTestId('email-input');
		const btn = EmailScreen.getByTestId('btn-next-registration')
		act(() => fireEvent.changeText(text, 'a@itechart-group.com'));
		await act(async () => fireEvent(text, 'blur'));
		expect(btn).not.toBeDisabled();
		fireEvent.press(btn);
		const newHeader = EmailScreen.getByText('Create password');
		expect(newHeader).toBeDefined();
		EmailScreen.unmount();
	});
	it('Render & rigth input & next page', async () => {
        const EmailScreen = await waitFor(() =>
			render(
                renderWithRouter(null, 'Registration')
			),
		);
		const btn = EmailScreen.getByTestId('discard-registration')
		expect(btn).not.toBeDisabled();
		fireEvent.press(btn);
		const newHeader = EmailScreen.getByText('Register here');
		expect(newHeader).toBeDefined();
		EmailScreen.unmount();
	});
});

describe('Password Screen', () => {
	afterEach(cleanup);

	afterEach(async () => {
		const dataToChange = {email: '', password: ''};
		await act(async () => store.dispatch(changeUserInfo(dataToChange)));
		await act(async () => store.dispatch(changeUserIsLoggedIn(false)));
	});

	it('Render', async () => {
		const PasswordScreen = await waitFor(() =>
			render(
                renderWithRouter(null, 'CreatePassword')
			),
		);
		// expect(EmailScreen).toMatchSnapshot();
		PasswordScreen.unmount();
	});

	it('Render & Passwords rigth', async () => {
		const PasswordScreen = await waitFor(() =>
			render(
                renderWithRouter(null, 'CreatePassword')
			),
		);
		const text1 = PasswordScreen.getByTestId('password1');
		const text2 = PasswordScreen.getByTestId('password2');
		const btn1 = PasswordScreen.getByText('Setup password')
		act(() => fireEvent.changeText(text1, 'Sasha@211'));
		await act(async () => fireEvent(text1, 'blur'));
		act(() => fireEvent.changeText(text2, 'Sasha@211'));
		await act(async () => fireEvent(text2, 'blur'));
		expect(btn1).not.toBeDisabled();
		PasswordScreen.unmount();
	});

	it('Render & Password 1 wrong 1 type', async () => {
		const PasswordScreen = await waitFor(() =>
			render(
                renderWithRouter(null, 'CreatePassword')
			),
		);
		const text1 = PasswordScreen.getByTestId('password1');
		const error1 = PasswordScreen.getByText('at least 8 characters;')
		act(() => fireEvent.changeText(text1, 'Sasha'));
		await act(async () => fireEvent(text1, 'blur'));
		expect(error1.props.style.color).not.toEqual('rgba(0, 0, 0, 0.54)')
		PasswordScreen.unmount();
	});

	it('Render & Password 1 wrong 2 type', async () => {
		const PasswordScreen = await waitFor(() =>
			render(
                renderWithRouter(null, 'CreatePassword')
			),
		);
		const text1 = PasswordScreen.getByTestId('password1');
		const error2 = PasswordScreen.getByText('uppercase and lowercase characters (a-z and A-Z);')
		act(() => fireEvent.changeText(text1, 'sasha@211'));
		await act(async () => fireEvent(text1, 'blur'));
		expect(error2.props.style.color).not.toEqual('rgba(0, 0, 0, 0.54)')
		PasswordScreen.unmount();
	});

	it('Render & Password 1 wrong 3 type', async () => {
		const PasswordScreen = await waitFor(() =>
			render(
                renderWithRouter(null, 'CreatePassword')
			),
		);
		const text1 = PasswordScreen.getByTestId('password1');
		const error3 = PasswordScreen.getByText('digits and punctuation characters (0-9 and !@#$%^&*);')
		act(() => fireEvent.changeText(text1, 'Sasha211'));
		await act(async () => fireEvent(text1, 'blur'));
		expect(error3.props.style.color).not.toEqual('rgba(0, 0, 0, 0.54)')
		PasswordScreen.unmount();
	});

	it('Render & Passwords eye/ eye-off', async () => {
		const PasswordScreen = await waitFor(() =>
			render(
                renderWithRouter(null, 'CreatePassword')
			),
		);
		const text1 = PasswordScreen.getByTestId('password1');
		const eye = PasswordScreen.getByTestId('eye')
		expect(text1.props.secureTextEntry).toEqual(true);;
		fireEvent.press(eye);
		expect(text1.props.secureTextEntry).toEqual(false);;
		PasswordScreen.unmount();
	});

	it('Render & Password 2 wrong', async () => {
		const PasswordScreen = await waitFor(() =>
			render(
                renderWithRouter(null, 'CreatePassword')
			),
		);
		const text1 = PasswordScreen.getByTestId('password1');
		const text2 = PasswordScreen.getByTestId('password2');
		const btn1 = PasswordScreen.getByText('Setup password')
		const errorBoth = PasswordScreen.getByText('Both password must match.')
		act(() => fireEvent.changeText(text1, 'Sasha@211'));
		await act(async () => fireEvent(text1, 'blur'));
		act(() => fireEvent.changeText(text2, 'Sasha@21'));
		await act(async () => fireEvent(text2, 'blur'));
		expect(errorBoth.props.style.color).not.toEqual('rgba(0, 0, 0, 0.54)')
		expect(btn1).toBeDisabled();
		PasswordScreen.unmount();
	});

	it('Render & onSubmit', async () => {
		const PasswordScreen = await waitFor(() =>
			render(
				<Provider store={store}>
					<AuthProvider>
						<CreatePassword route={{
									params: {
										userInfo: {
											firstName: '',
											lastName: '',
											email: 'a@itechart-group.com',
											birth: '',
											avatar: '',
										}
									}
								}}/>
					</AuthProvider>
				</Provider>

			),
		);
		const text1 = PasswordScreen.getByTestId('password1');
		const text2 = PasswordScreen.getByTestId('password2');
		const btn1 = PasswordScreen.getByText('Setup password')
		act(() => fireEvent.changeText(text1, 'Sasha@211'));
		await act(async () => fireEvent(text1, 'blur'));
		act(() => fireEvent.changeText(text2, 'Sasha@211'));
		await act(async () => fireEvent(text2, 'blur'));
		expect(btn1).not.toBeDisabled();
		await act(async () => fireEvent.press(btn1));
		expect(store.getState().user.isLoggedIn).toEqual(true);
		expect(store.getState().user.login).toEqual({email: 'a@itechart-group.com', password: 'Sasha@211'});
		PasswordScreen.unmount();
	});

	describe('index Screen', () => {
		afterEach(cleanup);
		it('Render', async () => {
			const indexScreen = await waitFor(() =>
				render(
					renderWithRouter(null, 'SignUp')
				),
			);
			expect(indexScreen).toBeDefined();
			indexScreen.unmount();
		});
	})

});