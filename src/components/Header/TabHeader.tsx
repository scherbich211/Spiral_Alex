import React from 'react';
import {Platform, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {Appbar, useTheme} from 'react-native-paper';
import Typography from '../Typography';
import {SIZES} from '../../theme';

interface IStyle {
	headerView: ViewStyle;
	headerText: TextStyle;
	headerBeforeView: ViewStyle;
}
interface Props {
	headerText?: string;
	children?: React.ReactNode;
	beforeText?: React.ReactNode;
	headerStyle?: TextStyle;
}

const TabHeader: React.FC<Props> = props => {
	const theme = useTheme();
	const {headerText} = props;
	const styles = useStyles(headerText || 'no Name');
	return (
		<Appbar.Header
			theme={{
				colors: {
					primary: theme?.colors.primary,
				},
			}}
			style={styles.headerView}>
			{props.beforeText ? (
				<View style={styles.headerBeforeView}>
					{props.beforeText}
					<Typography element="h3" style={{...styles.headerText, ...props.headerStyle}}>
						{props.headerText}
					</Typography>
				</View>
			) : (
				<View>
					<Typography element="h3" style={styles.headerText}>
						{props.headerText}
					</Typography>
				</View>
			)}
			{props.children}
		</Appbar.Header>
	);
};

const useStyles = StyleSheet.create(
	(headerText: string): IStyle => ({
		headerView: {
			alignItems: 'center',
			elevation: 2,
			zIndex: 2,
		},
		headerText: {
			fontWeight: '700',
			marginLeft: headerText.length > 6 ? SIZES.width * 0.25 : SIZES.width * 0.3,
			fontSize: Platform.OS === 'ios' ? 18 : 17,
			letterSpacing: Platform.OS === 'ios' ? 1 : 0.8,
			color: 'white',
		},
		headerBeforeView: {
			flexDirection: 'row',
			alignItems: 'center',
			flex: 1,
		},
	}),
);

export default TabHeader;
