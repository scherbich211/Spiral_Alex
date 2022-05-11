import { act, cleanup, fireEvent, render, waitFor } from "@testing-library/react-native";
import { changeDarkMode } from "../../../../../../src/redux/reducers/profile";
import { changeUserIsLoggedIn } from "../../../../../../src/redux/reducers/user";
import store from "../../../../../../src/redux/store";
import { renderWithRouter } from "./helper";

describe('Home Screens', () => {
	afterEach(cleanup);
    const providerProps = {
        darkMode: false,
        toggleTheme: () =>  store.dispatch(changeDarkMode(!providerProps.darkMode))
    }
    beforeAll(async () => {
      await act(async () => store.dispatch(changeUserIsLoggedIn(true)));
      await act(async () => store.dispatch(changeDarkMode(false)));
    })
    it('Render HomeScreen', async () => {
      const HomeScreen = await waitFor(() =>
        render(
            renderWithRouter(providerProps)
        ),
      );
      HomeScreen.unmount();
	  });
    it('Render HomeScreen & drawer open & sign out', async () => {
      const HomeScreen = await waitFor(() =>
        render(
            renderWithRouter(providerProps)
        ),
		  );
      const btn = HomeScreen.getByTestId('Drawer-open')
      await act(async () => fireEvent.press(btn));
      const btnOut = HomeScreen.queryAllByText('Sign-Out')
      await act(async () => fireEvent.press(btnOut[0]));
      expect(store.getState().user.isLoggedIn).toEqual(false);
      expect(store.getState().user.login).toEqual({email: '', password: ''});
      expect(store.getState().profile.avatar).toEqual('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
      expect(store.getState().profile.userInfo).toEqual({name: '', birth: ''});
      HomeScreen.unmount();
	  });

    it('Render HomeScreen  drawer open & toggleTheme', async () => {
      const HomeScreen = await waitFor(() =>
        render(
            renderWithRouter(providerProps)
        ),
		  );
      const btn = HomeScreen.getByTestId('Drawer-open')
      await act(async () => fireEvent.press(btn));
      const btnOut = HomeScreen.queryAllByText('Dark Theme')
      await act(async () => fireEvent.press(btnOut[0]));
      expect(store.getState().profile.darkMode).toEqual(true);
      HomeScreen.unmount();
	  });
    
});
