import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {useDispatch} from 'react-redux';
import {useAppSelector} from './hooks';
import {CustomDefaultTheme, CustomDarkTheme, PreferencesContext} from './theme';
import {RootStackParamList} from './types';
import store from './redux/store';
import SignIn from './screens/SignIn';
import {changeDarkMode} from './redux/reducers/profile';
import DrawerNavigator from './screens/HomeScreens/Drawer';
import SignUp from './screens/SignUp';

const persistor = persistStore(store);

const Stack = createNativeStackNavigator<RootStackParamList>();

const Main = (): JSX.Element => {
	const {isLoggedIn} = useAppSelector(state => state.user);
	const darkMode = useAppSelector(state => state.profile.darkMode);
	const dispatch = useDispatch();

	const theme = darkMode ? CustomDarkTheme : CustomDefaultTheme;

	const toggleTheme = React.useCallback(() => {
		return dispatch(changeDarkMode(!darkMode));
	}, [darkMode]);

	const newLocal = 1;
	const loader = (
		<View style={{flex: newLocal}}>
			<ActivityIndicator size="large" />
		</View>
	);

	// useEffect(() => {
	// 	if (!isOnboarded) {
	// 		if (Appearance.getColorScheme() === 'dark') {
	// 			dispatch(changeDarkMode(true));
	// 		} else {
	// 			dispatch(changeDarkMode(false));
	// 		}
	// 	}
	// }, []);

	const preferences = React.useMemo(
		() => ({
			toggleTheme,
			darkMode,
		}),
		[toggleTheme, darkMode],
	);

	return (
		<PersistGate persistor={persistor} loading={loader}>
			<PreferencesContext.Provider value={preferences}>
				<PaperProvider theme={theme}>
					<NavigationContainer theme={theme}>
						<Stack.Navigator>
							{isLoggedIn ? (
								<Stack.Screen name="DrawerNavigator" options={{headerShown: false}} component={DrawerNavigator} />
							) : (
								<>
									<Stack.Screen name="SignIn" options={{headerShown: false}} component={SignIn} />
									<Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUp} />
								</>
							)}
						</Stack.Navigator>
					</NavigationContainer>
				</PaperProvider>
			</PreferencesContext.Provider>
		</PersistGate>
	);
};

export default Main;
