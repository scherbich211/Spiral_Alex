import { act, cleanup, fireEvent, render, waitFor } from "@testing-library/react-native";
import { changeDarkMode } from "../../../../../../src/redux/reducers/profile";
import store from "../../../../../../src/redux/store";
import GoodnessScreen from "../../../../../../src/screens/HomeScreens/AdditionalScreens/Goodness";
import { renderWithRouter } from "./helper";
import React from 'react'
describe('Additional Screens', () => {
	afterEach(cleanup);
    const mockedCanGoBack = jest.fn().mockReturnValue(true);

    const mockedGoBack = jest.fn();

    const mockedNavigation = { canGoBack: mockedCanGoBack, goBack: mockedGoBack, }

    const providerProps = {
        darkMode: false,
        toggleTheme: () =>  store.dispatch(changeDarkMode(!providerProps.darkMode))
    }
    it('Render HomeScreen', async () => {
      const HomeScreen = await waitFor(() =>
        render(
            renderWithRouter(providerProps,'HomeDrawer')
        ),
      );
      HomeScreen.unmount();
	});
    it('Render Checking Screen', async () => {
      const Checking = await waitFor(() =>
        render(
            renderWithRouter(providerProps, 'Checking')
        ),
	  );
      const btn = Checking.getByTestId('back')
      await act(async () => fireEvent.press(btn));
      Checking.unmount();
	});
    it('Render Goodness Screen', async () => {
        const Goodness = await waitFor(() =>
            render(
                <GoodnessScreen navigation={mockedNavigation as any}/>
            ),
        );
        const btn = await Goodness.getByTestId('navigate-empty')
		expect(btn).toBeDefined();
		fireEvent(btn, 'press');
        Goodness.unmount();
    });
    it('Render Savings Screen', async () => {
        const Savings = await waitFor(() =>
            render(
                renderWithRouter(providerProps,'Savings')
            ),
        );
        const btn = await Savings.getByTestId('navigate-back')
		expect(btn).toBeDefined();
		fireEvent(btn, 'press');
        Savings.unmount();
    });
});
