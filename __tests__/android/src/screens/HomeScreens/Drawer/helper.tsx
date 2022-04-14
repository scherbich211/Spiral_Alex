import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Provider } from "react-redux";
import { AuthProvider } from "../../../../../../src/AuthProvider";
import store from "../../../../../../src/redux/store";
import {Provider as PaperProvider} from 'react-native-paper';
import CustomDefaultTheme, { CustomDarkTheme, PreferencesContext } from "../../../../../../src/theme";
import { render, waitFor } from "@testing-library/react-native";
import DrawerNavigator from "../../../../../../src/screens/HomeScreens/Drawer";

export const renderWithRouter = (darkMode: boolean) => { 
	const theme = darkMode ? CustomDarkTheme : CustomDefaultTheme;
    return (
        <Provider store={store}>
			<AuthProvider>
					<PaperProvider theme={theme}>
						<NavigationContainer theme={theme}>
							<DrawerNavigator />
						</NavigationContainer>
					</PaperProvider>
            </AuthProvider>
		</Provider>
    )
}

describe('Helper', () => {
	it('Render Helper', async () => {
		const rendering = await waitFor(() =>
			render(renderWithRouter(false)),
		);
		rendering.unmount();
	});
});