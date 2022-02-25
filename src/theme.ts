import {DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import {DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme} from 'react-native-paper';
import React from 'react';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const SIZES = {
	base: 10,
	width,
	height,
};

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace ReactNativePaper {
		interface ThemeColors {
			input: string;
		}
	}
}

export const CustomDefaultTheme = {
	...NavigationDefaultTheme,
	...PaperDefaultTheme,
	colors: {
		...NavigationDefaultTheme.colors,
		...PaperDefaultTheme.colors,
		primary: '#C81A7C',
		accent: '#62CA88',
		background: '#F5F5F5',
		text: '#232323',
		placeholder: '#7D7D7D',
		disabled: 'rgba(125, 125, 125, 0.5)',
		input: '#E1E1E1',
		backdrop: '#121212',
		content: 'white',
	},
};

export const CustomDarkTheme = {
	...NavigationDarkTheme,
	...PaperDarkTheme,
	colors: {
		...NavigationDarkTheme.colors,
		...PaperDarkTheme.colors,
		primary: '#481C4F',
		accent: '#62CA88',
		background: '#47495A',
		text: '#FFFFFF',
		placeholder: '#7D7D7D',
		disabled: 'rgba(125, 125, 125, 0.5)',
		input: '#47495A',
		backdrop: '#121212',
		content: '#32333D',
	},
};

export default CustomDefaultTheme;

export const PreferencesContext = React.createContext({
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	toggleTheme: () => {},
	darkMode: false,
});
