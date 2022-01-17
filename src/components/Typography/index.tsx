/* eslint-disable react/no-unused-prop-types */
import * as React from 'react';
import {LayoutChangeEvent, StyleSheet, TextStyle} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

type TypographyElement = 'h1' | 'h2' | 'h3' | 'body' | 'button' | 'caption';
type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

const getFontSize = (element?: TypographyElement): number => {
	switch (element) {
		case 'h1':
			return 24;
		case 'h2':
			return 24;
		case 'h3':
			return 20;
		case 'body':
			return 16;
		case 'button':
			return 14;
		case 'caption':
			return 11;
		default:
			return 14;
	}
};

const getFontFamily = (element?: TypographyElement): string => {
	switch (element) {
		case 'h1':
			return 'Roboto-Regular';
		case 'h2':
			return 'Roboto-Regular';
		case 'h3':
			return 'Roboto-Regular';
		case 'body':
			return 'RobotoCondensed-Regular';
		case 'button':
			return 'Roboto-Regular';
		case 'caption':
			return 'RobotoCondensed-Regular';
		default:
			return 'RobotoCondensed-Regular';
	}
};

const getFontWeight = (element?: TypographyElement): FontWeight => {
	switch (element) {
		case 'h1':
			return 'bold';
		case 'h2':
			return 'bold';
		case 'h3':
			return 'bold';
		case 'body':
			return 'normal';
		case 'button':
			return '500';
		case 'caption':
			return 'normal';
		default:
			return 'normal';
	}
};

interface Props {
	element?: TypographyElement;
	fontSize?: number;
	fontWeight?: FontWeight;
	letterSpacing?: number;
	fontFamily?: string;
	children: React.ReactNode;
	style?: TextStyle;
	onLayout?: (event: LayoutChangeEvent) => void;
	color?: TextStyle['color'];
}

const Typography: React.FunctionComponent<Props> = props => {
	const theme = useTheme();
	const {children, onLayout} = props;
	const styles = useStyles({props: {...props}, theme});
	return (
		<Text style={StyleSheet.flatten([styles.main, props.style])} onLayout={onLayout}>
			{children}
		</Text>
	);
};

const useStyles = ({props, theme}: {props: Props; theme: ReactNativePaper.Theme}) =>
	StyleSheet.create({
		main: {
			fontSize: props.fontSize ? props.fontSize : getFontSize(props.element),
			fontFamily: props.fontFamily ? props.fontFamily : getFontFamily(props.element),
			fontWeight: props.fontWeight ? props.fontWeight : getFontWeight(props.element),
			color: props.color ? props.color : theme.colors.text,
		},
	});

export default Typography;
