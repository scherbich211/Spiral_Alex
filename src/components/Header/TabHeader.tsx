import React from 'react';
import {Platform, StyleSheet, TextStyle, View} from 'react-native';
import {Appbar, useTheme} from 'react-native-paper';
import {useAppSelector} from '../../hooks';
import InternetConnection from '../../screens/ScreensHome/AdditionalScreens/InternetConnection';
import {SIZES} from '../../theme';
import Typography from '../Typography';
import CheckToken from './CheckToken';

interface Props {
	headerText?: string;
	children?: React.ReactNode;
	beforeText?: React.ReactNode;
	headerStyle?: TextStyle;
}

const TabHeader: React.FC<Props> = props => {
	const theme = useTheme();
	const {internetConnection} = useAppSelector(state => state.user);
	return (
		<>
			{internetConnection ? (
				<Appbar.Header
					theme={{
						colors: {
							primary: theme?.colors.surface,
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
						<Typography element="h3" style={styles.headerText}>
							{props.headerText}
						</Typography>
					)}
					<CheckToken />
					{props.children}
				</Appbar.Header>
			) : (
				<View>
					<View>
						<Appbar.Header
							theme={{
								colors: {
									primary: theme?.colors.surface,
								},
							}}
							style={[styles.headerView, {marginTop: SIZES.width * 0.2}]}>
							{props.beforeText ? (
								<View style={styles.headerBeforeView}>
									{props.beforeText}
									<Typography element="h3" style={{...styles.headerText, ...props.headerStyle}}>
										{props.headerText}
									</Typography>
								</View>
							) : (
								<Typography element="h3" style={styles.headerText}>
									{props.headerText}
								</Typography>
							)}
							<CheckToken />
							{props.children}
						</Appbar.Header>
					</View>
					<View style={styles.fullScreen}>
						<InternetConnection />
					</View>
				</View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	headerView: {
		alignItems: 'center',
		justifyContent: 'space-between',
		elevation: 2,
		zIndex: 2,
	},
	headerText: {
		fontWeight: '700',
		marginLeft: SIZES.width * 0.05,
		fontSize: Platform.OS === 'ios' ? 16 : 17,
		letterSpacing: Platform.OS === 'ios' ? 1 : 0.8,
		textTransform: 'uppercase',
	},
	headerBeforeView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		flex: 1,
	},
	fullScreen: {
		position: 'relative',
		width: SIZES.width,
		height: SIZES.height * 0.8,
		flexBasis: '100%',
	},
});

export default TabHeader;
