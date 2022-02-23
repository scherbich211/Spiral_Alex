import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import Main from './src/Main';
import store from './src/redux/store';
import {AuthProvider} from './src/AuthProvider';

const App = (): JSX.Element => {
	React.useEffect(() => {
		SplashScreen.hide();
	}, []);
	return (
		<Provider store={store}>
			<SafeAreaProvider>
				<AuthProvider>
					<Main />
				</AuthProvider>
			</SafeAreaProvider>
		</Provider>
	);
};

export default App;
