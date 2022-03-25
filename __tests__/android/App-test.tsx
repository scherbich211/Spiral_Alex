/**
 * @format
 */
import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../../App';

jest.mock('react-native', function () {
	const reactNative = jest.requireActual('react-native');
	jest.spyOn(reactNative.Platform, 'select').mockImplementation(() => 'android');
	reactNative.Platform.OS = 'android';
	return reactNative;
});
it('renders correctly', () => {
	render(<App />);
});
