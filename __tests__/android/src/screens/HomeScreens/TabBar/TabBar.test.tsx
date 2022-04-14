import { cleanup, render, waitFor } from "@testing-library/react-native";
import { renderWithRouter } from "./helper";

describe('TabBar Screens', () => {

	afterEach(cleanup);

    it('Render HomeScreen', async () => {
		const HomeScreen = await waitFor(() =>
			render(
                renderWithRouter(false)
			),
		);
		HomeScreen.unmount();
	});
	it('Render HomeScreen', async () => {
		const HomeScreen = await waitFor(() =>
			render(
                renderWithRouter(true)
			),
		);
		HomeScreen.unmount();
	});
});
