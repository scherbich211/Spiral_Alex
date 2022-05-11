import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Provider } from "react-redux";
import { AuthProvider } from "../../../../../../src/AuthProvider";
import store from "../../../../../../src/redux/store";
import {Provider as PaperProvider} from 'react-native-paper';
import CustomDefaultTheme, { CustomDarkTheme, PreferencesContext } from "../../../../../../src/theme";
import { act, render, waitFor } from "@testing-library/react-native";
import CheckingStackScreen from '../../../../../../src/screens/HomeScreens/AdditionalScreens/Checking';
import SavingsStackScreen from '../../../../../../src/screens/HomeScreens/AdditionalScreens/Saving';
import GoodnessScreen from '../../../../../../src/screens/HomeScreens/AdditionalScreens/Goodness';
import Profile from '../../../../../../src/screens/HomeScreens/AdditionalScreens/Profile';
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
},initialRoute: keyof DrawerStackParamList) => { 
	const theme = preferences.darkMode ? CustomDarkTheme : CustomDefaultTheme;
    return (
        <Provider store={store}>
			<AuthProvider>
			    <PreferencesContext.Provider value={preferences}>
                    <PaperProvider theme={theme}>
                        <NavigationContainer theme={theme} >
                            <Navigator screenOptions={{headerShown: false}} initialRouteName={initialRoute}>
                                <Screen name='HomeDrawer' component={TabNavigator} options={{headerShown: false}}/>
                                <Screen name="Checking" component={CheckingStackScreen} />
                                <Screen name="Savings" component={SavingsStackScreen} />
                                <Screen name="Goodness" component={GoodnessScreen} />
                                <Screen name="Profile" component={Profile} />
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
			render(renderWithRouter(providerProps,'HomeDrawer')),
		);
		rendering.unmount();
	});
});


// import { NavigationContainer } from "@react-navigation/native";
// import { cleanup,  render, waitFor } from "@testing-library/react-native";
// import { Provider } from "react-redux";
// import { AuthProvider } from "../../../../../../src/AuthProvider";
// import { changeDarkMode } from "../../../../../../src/redux/reducers/profile";
// import store from "../../../../../../src/redux/store";
// import CustomDefaultTheme, { PreferencesContext } from "../../../../../../src/theme";
// import {Provider as PaperProvider} from 'react-native-paper';
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import Profile from "../../../../../../src/screens/HomeScreens/AdditionalScreens/Profile";
// import React from 'react'
// const {Navigator, Screen} = createDrawerNavigator();

// describe('Additional Screens', () => {
// 	afterEach(cleanup);

//     const providerProps = {
//         darkMode: false,
//         toggleTheme: () =>  store.dispatch(changeDarkMode(!providerProps.darkMode))
//     }
//     it('Render Profile Screen', async () => {
//         const Profiles = await waitFor(() =>
//             render(
//                 <Provider store={store}>
//                     <AuthProvider>
//                         <PreferencesContext.Provider value={providerProps}>
//                             <PaperProvider theme={CustomDefaultTheme}>
//                                 <NavigationContainer theme={CustomDefaultTheme} >
//                                     <Navigator screenOptions={{headerShown: false}}>
//                                         <Screen name="Profile" component={Profile} />
//                                     </Navigator>
//                                 </NavigationContainer>
//                             </PaperProvider>
//                         </PreferencesContext.Provider>
//                     </AuthProvider>
// 		        </Provider>
//             ),
//         );
        
//         Profiles.unmount();
//     });
// });
