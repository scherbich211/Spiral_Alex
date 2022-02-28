import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useAppDispatch, useAppSelector} from './hooks';
import {CustomDefaultTheme, CustomDarkTheme, PreferencesContext} from './theme';
import {RootStackParamList} from './types';
import store from './redux/store';
import SignIn from './screens/SignIn';
import {changeDarkMode} from './redux/reducers/profile';
import DrawerNavigator from './screens/HomeScreens/Drawer';
import SignUp from './screens/SignUp';
import {AuthContext} from './AuthProvider';

const persistor = persistStore(store);

const Stack = createNativeStackNavigator<RootStackParamList>();

const Main = () => {
	const {user, setUser} = useContext(AuthContext);
	const [initializing, setInitializing] = useState(true);
	const {isLoggedIn} = useAppSelector(state => state.user);
	const darkMode = useAppSelector(state => state.profile.darkMode);
	const dispatch = useAppDispatch();

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

	const preferences = React.useMemo(
		() => ({
			toggleTheme,
			darkMode,
		}),
		[toggleTheme, darkMode],
	);

	const onAuthStateChanged = (userAuth: FirebaseAuthTypes.User | null) => {
		setUser(userAuth);
		if (initializing) {
			setInitializing(false);
		}
	};

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber;
	}, [user, setUser]);

	if (initializing) {
		return null;
	}

	return (
		<PersistGate persistor={persistor} loading={loader}>
			<PreferencesContext.Provider value={preferences}>
				<PaperProvider theme={theme}>
					<NavigationContainer theme={theme}>
						<Stack.Navigator>
							{isLoggedIn && user ? (
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
