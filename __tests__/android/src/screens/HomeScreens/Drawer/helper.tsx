import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Provider } from "react-redux";
import { AuthProvider } from "../../../../../../src/AuthProvider";
import store from "../../../../../../src/redux/store";
import {Provider as PaperProvider} from 'react-native-paper';
import CustomDefaultTheme, { CustomDarkTheme, PreferencesContext } from "../../../../../../src/theme";
import { act, render, waitFor } from "@testing-library/react-native";
import { changeDarkMode } from "../../../../../../src/redux/reducers/profile";
import DrawerNavigator from "../../../../../../src/screens/HomeScreens/Drawer";

jest.mock('react-native/Libraries/Components/Switch/Switch', () => {
    const mockComponent = require('react-native/jest/mockComponent')
    return {
      default: mockComponent('react-native/Libraries/Components/Switch/Switch')
    }
  })

export const renderWithRouter = (preferences: {
    toggleTheme: () => void;
    darkMode: boolean;
}) => { 
	const theme = preferences.darkMode ? CustomDarkTheme : CustomDefaultTheme;
    return (
        <Provider store={store}>
			<AuthProvider>
			    <PreferencesContext.Provider value={preferences}>
                    <PaperProvider theme={theme}>
                        <NavigationContainer theme={theme}>
								<DrawerNavigator/>
                        </NavigationContainer>
                    </PaperProvider>
                </PreferencesContext.Provider>
            </AuthProvider>
		</Provider>
    )
}

describe('Helper', () => {
    beforeAll(async () => {
		await act(async () => store.dispatch(changeDarkMode(false)));
	});
    const providerProps = {
        darkMode: false,
        toggleTheme: () => store.dispatch(changeDarkMode(true)),
    }
    
	it('Render Helper', async () => {
		const rendering = await waitFor(() =>
			render(renderWithRouter(providerProps)),
		);
		rendering.unmount();
	});
});