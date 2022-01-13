import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useTheme} from 'react-native-paper';
import {dollars, cents} from './List';
import Typography from '../../../../components/Typography';
import {ComponentsForHomeStyles} from '../../../../types/Home';

export const HeaderPartsContainer = () => {
	const theme = useTheme();
	const styles = useStyles(theme);

	return (
		<View style={styles.headerPartsContainer}>
			<View style={styles.TypographyHeaderPartsContainer}>
				<Typography style={styles.impactHeaderPartsContainer}>Your Giving Impact</Typography>
				<View style={styles.rowAndCenter}>
					<Typography style={styles.greyTypographyHeaderPartsContainer}>St Jude</Typography>
					<View style={styles.dot} />
					<Typography style={styles.greyTypographyHeaderPartsContainer}>4 hrs ago</Typography>
				</View>
			</View>
		</View>
	);
};

export const ImageChildren = () => {
	return (
		<View>
			<Typography>here must be children</Typography>
		</View>
	);
};

export const ImpactTypography = () => {
	const theme = useTheme();
	const styles = useStyles(theme);

	return (
		<View style={styles.impactTextPartsContainer}>
			<Typography style={styles.wight}>
				Danny. Your donation helped 5 amazing kids get much needed cancer surgery, thanks for being amazing!
			</Typography>
		</View>
	);
};

export const ButtonShare = () => {
	const theme = useTheme();
	const styles = useStyles(theme);

	return (
		<View>
			<TouchableOpacity style={StyleSheet.flatten([styles.shareButton, styles.rowAndCenter])}>
				<Fontisto name="share-a" size={25} />
				<Typography style={styles.shareButtonText}>Share to spread the word</Typography>
			</TouchableOpacity>
		</View>
	);
};

export const DateNow = () => {
	const theme = useTheme();
	const styles = useStyles(theme);

	return <Typography style={styles.date}>{/* {currentTime} Danny | {currentDate} */}asda</Typography>;
};

export const TotalAvailableCash = () => {
	const theme = useTheme();
	const styles = useStyles(theme);

	return (
		<TouchableOpacity>
			<Typography style={styles.totalAvailableCashBig}>Accounts Overview</Typography>
			<Typography style={styles.totalAvailableCashBig}>
				${dollars.reduce((a, b) => a + b, 0)}
				<Typography style={styles.totalAvailableCashLittle}>.{cents.reduce((a, b) => a + b, 0)}</Typography>
			</Typography>
			<Typography style={styles.totalAvailableCash}>Total Available Cash</Typography>
		</TouchableOpacity>
	);
};

const useStyles = StyleSheet.create(
	(theme: ReactNativePaper.Theme): ComponentsForHomeStyles => ({
		headerPartsContainer: {
			margin: 10,
			flexDirection: 'row',
			alignItems: 'center',
		},
		TypographyHeaderPartsContainer: {
			marginLeft: 15,
		},
		impactHeaderPartsContainer: {
			fontSize: 16,
			fontWeight: '300',
		},
		rowAndCenter: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		greyTypographyHeaderPartsContainer: {
			color: 'grey',
			fontWeight: '300',
		},
		dot: {
			borderColor: theme.colors.primary,
			borderWidth: 2,
			borderRadius: 5,
			marginHorizontal: 3,
		},
		impactTextPartsContainer: {
			margin: 15,
		},
		shareButton: {
			width: 300,
			height: 55,
			alignSelf: 'center',
			borderColor: '#CB1961',
			borderRadius: 50,
			backgroundColor: '#CB1961',
			alignItems: 'center',
			marginBottom: 15,
		},
		shareButtonText: {
			color: 'white',
			fontWeight: '700',
			fontSize: 14,
			marginLeft: 5,
		},
		date: {
			paddingBottom: 10,
		},
		totalAvailableCash: {
			alignSelf: 'center',
			color: 'grey',
			marginTop: 3,
			fontSize: 12,
		},
		totalAvailableCashBig: {fontSize: 25, alignSelf: 'center'},
		totalAvailableCashLittle: {fontSize: 20, alignSelf: 'center'},
		wight: {fontWeight: '300'},
	}),
);
