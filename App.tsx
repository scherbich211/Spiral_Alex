import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import Main from './src/Main';
import store from './src/redux/store';

const App = (): JSX.Element => {
	React.useEffect(() => {
		SplashScreen.hide();
	}, []);
	return (
		<Provider store={store}>
			<SafeAreaProvider>
				<Main />
			</SafeAreaProvider>
		</Provider>
	);
};

export default App;
