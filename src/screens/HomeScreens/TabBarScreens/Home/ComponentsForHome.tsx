import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'react-native-paper';
import Typography from '../../../../components/Typography';
import {ComponentsForHomeStyles} from '../../../../types/home';
import ChildrenImage from '../../../../../assets/Image/rectangle2.png';
import {dollars, cents} from '../../../../utils/mockLists';

export const HeaderPartsContainer = () => {
	const theme = useTheme();
	const styles = useStyles(theme);

	return (
		<View style={styles.headerPartsContainer}>
			<Typography style={styles.impactHeaderPartsContainer}>Your Giving Impact</Typography>
			<View style={styles.rowAndCenter}>
				<Typography style={styles.greyTypographyHeaderPartsContainer}>St Jude</Typography>
				<View style={styles.dot} />
				<Typography style={styles.greyTypographyHeaderPartsContainer}>4 hrs ago</Typography>
			</View>
		</View>
	);
};

export const ImageChildren = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<View>
			<Image source={ChildrenImage} style={styles.imageWidth} />
		</View>
	);
};

export const ImpactText = () => {
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
			<TouchableOpacity style={styles.shareButton}>
				<MaterialCommunityIcons name="share" color="white" size={26} />
				<Text style={styles.shareButtonText}>Share to spread the word </Text>
			</TouchableOpacity>
		</View>
	);
};

export const DateNow = () => {
	const theme = useTheme();
	const styles = useStyles(theme);

	return (
		<Typography style={styles.date}>
			Hello Danny || Today is {new Date().getDate()}.{new Date().getMonth() + 1}.{new Date().getFullYear()}
		</Typography>
	);
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
			margin: 15,
			flexDirection: 'column',
			alignItems: 'flex-start',
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
			backgroundColor: theme.colors.primary,
			alignItems: 'center',
			justifyContent: 'center',
			flexDirection: 'row',
			marginBottom: 15,
		},
		shareButtonText: {
			color: 'white',
			fontWeight: '700',
			fontSize: 14,
			marginLeft: 5,
		},
		date: {
			margin: 10,
		},
		totalAvailableCash: {
			alignSelf: 'center',
			color: 'grey',
			marginTop: 3,
			fontSize: 12,
		},
		totalAvailableCashBig: {fontSize: 25, alignSelf: 'center'},
		totalAvailableCashLittle: {fontSize: 20, alignSelf: 'center'},
		wight: {fontWeight: '400', fontSize: 16, letterSpacing: 0.5},
		imageWidth: {width: '100%'},
	}),
);
