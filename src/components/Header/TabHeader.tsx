import React from 'react';
import {Platform, StyleSheet, TextStyle, View} from 'react-native';
import {Appbar, useTheme} from 'react-native-paper';
import Typography from '../Typography';
import {SIZES} from '../../theme';

interface Props {
	headerText?: string;
	children?: React.ReactNode;
	beforeText?: React.ReactNode;
	headerStyle?: TextStyle;
}

const TabHeader: React.FC<Props> = props => {
	const theme = useTheme();
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

const styles = StyleSheet.create({
	headerView: {
		alignItems: 'center',
		elevation: 2,
		zIndex: 2,
	},
	headerText: {
		fontWeight: '700',
		marginLeft: SIZES.width * 0.3,
		fontSize: Platform.OS === 'ios' ? 18 : 17,
		letterSpacing: Platform.OS === 'ios' ? 1 : 0.8,
		color: 'white',
		// textTransform: 'uppercase',
	},
	headerBeforeView: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
});

export default TabHeader;
