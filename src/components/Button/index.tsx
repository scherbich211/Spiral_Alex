import React from 'react';
import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {Text, Button, useTheme} from 'react-native-paper';

interface Props {
	onPress?: () => void;
	children?: React.ReactNode;
	mode?: 'contained' | 'outlined' | 'text';
	disabled?: boolean;
	style?: ViewStyle;
	icon?: string;
	loading?: boolean;
}

const getTextColor = (mode: Props['mode'], theme: ReactNativePaper.Theme): TextStyle['color'] => {
	switch (mode) {
		case 'text':
			return theme.colors.primary;
		case 'contained':
			return theme.colors.background;
		case 'outlined':
			return theme.colors.primary;
		default:
			return undefined;
	}
};
const getBackgroundColor = (props: Props, theme: ReactNativePaper.Theme): ViewStyle['backgroundColor'] => {
	if (props.disabled) {
		return theme.colors.disabled;
	}
	switch (props.mode) {
		case 'contained':
			return theme.colors.primary;
		default:
			return undefined;
	}
};

const ButtonCustom: React.FC<Props> = props => {
	const {mode = 'text', children, style, ...rest} = props;

	const theme = useTheme();
	const styles = useStyles({props: {...props, mode}, theme});

	return (
		<Button mode={mode} style={StyleSheet.flatten([styles.button, style])} contentStyle={styles.contentStyle} {...rest}>
			{typeof children === 'string' ? <Text style={styles.text}>{children}</Text> : children}
		</Button>
	);
};

interface Styles {
	button: ViewStyle;
	text: TextStyle;
	contentStyle: ViewStyle;
}

const useStyles = StyleSheet.create(
	({props, theme}: {props: Props; theme: ReactNativePaper.Theme}): Styles => ({
		button: {
			width: '100%',
			borderRadius: 8,
			backgroundColor: getBackgroundColor(props, theme),
		},
		text: {
			fontFamily: 'Roboto-Regular',
			fontWeight: '500',
			fontSize: 15,
			letterSpacing: 1,
			color: getTextColor(props.mode, theme),
			textTransform: 'none',
		},
		contentStyle: {
			height: 50,
			alignItems: 'center',
			justifyContent: 'center',
		},
	}),
);

export default ButtonCustom;
