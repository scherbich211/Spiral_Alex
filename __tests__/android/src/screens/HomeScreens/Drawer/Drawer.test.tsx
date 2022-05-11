import { cleanup, render, waitFor } from "@testing-library/react-native";
import { changeDarkMode } from "../../../../../../src/redux/reducers/profile";
import store from "../../../../../../src/redux/store";
import { renderWithRouter } from "./helper";

describe('DrawerNavigator Screens', () => {

	afterEach(cleanup);
	
    it('Render HomeScreen', async () => {
		const providerProps = {
			darkMode: false,
			toggleTheme: ()=> store.dispatch(changeDarkMode(true)),
		}
		const HomeScreen = await waitFor(() =>
			render(
                renderWithRouter(providerProps)
			),
		);
		HomeScreen.unmount();
	});
	it('Render HomeScreen', async () => {
		const providerProps = {
			darkMode: true,
			toggleTheme: ()=> store.dispatch(changeDarkMode(false)),
		}
		const HomeScreen = await waitFor(() =>
			render(
                renderWithRouter(providerProps)
			),
		);
		HomeScreen.unmount();
	});
});
