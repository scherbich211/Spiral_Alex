import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Main from './src/Main';
import store from './src/redux/store';

const App = (): JSX.Element => {
	return (
		<Provider store={store}>
			<SafeAreaProvider>
				<Main />
			</SafeAreaProvider>
		</Provider>
	);
};

export default App;
