import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Provider } from "react-redux";
import { AuthProvider } from "../../../../../../src/AuthProvider";
import store from "../../../../../../src/redux/store";
import {Provider as PaperProvider} from 'react-native-paper';
import CustomDefaultTheme, { CustomDarkTheme, PreferencesContext } from "../../../../../../src/theme";
import { act, render, waitFor } from "@testing-library/react-native";
import { DrawerContent } from "../../../../../../src/screens/HomeScreens/DrawerComponent";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerStackParamList } from "../../../../../../src/types";
import { changeDarkMode } from "../../../../../../src/redux/reducers/profile";
import TabNavigator from "../../../../../../src/screens/HomeScreens/TabBar";

const {Navigator, Screen} = createDrawerNavigator<DrawerStackParamList>();

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
                        <NavigationContainer theme={theme} >
                            <Navigator screenOptions={{headerShown: false}} drawerContent={props => <DrawerContent {...props}/>}>
                                <Screen name='HomeDrawer' component={TabNavigator} options={{headerShown: false}}/>
                            </Navigator>
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
        toggleTheme: ()=> store.dispatch(changeDarkMode(!providerProps.darkMode)),
      }
    
	it('Render Helper', async () => {
		const rendering = await waitFor(() =>
			render(renderWithRouter(providerProps)),
		);
		rendering.unmount();
	});
});
