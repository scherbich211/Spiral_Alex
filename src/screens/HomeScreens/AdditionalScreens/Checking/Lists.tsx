import React from 'react';

import {StyleSheet, View} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import {useTheme} from 'react-native-paper';
import {ICheckingListStyles} from '../../../../types/checking';
import {list10, list11} from '../../../../utils/mockLists';
import Birthday from '../../../../../assets/Image/confetti2.png';
import {CustomDefaultTheme, CustomDarkTheme} from '../../../../theme';

export const ListOfJul11 = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<View>
			{list11.map(item => (
				<ListItem
					key={item.id}
					bottomDivider
					containerStyle={styles.borderRadius10}
					hasTVPreferredFocus={undefined}
					tvParallaxProperties={undefined}>
					{item.title === 'Facebook inc' ? <Avatar source={Birthday} /> : null}
					<ListItem.Content>
						<View style={styles.flexRow}>
							<View style={styles.width190}>
								{item.title === 'Facebook inc' ? (
									<View>
										<View style={StyleSheet.flatten([styles.flexRow, styles.alignCenter])}>
											<ListItem.Title
												numberOfLines={1}
												ellipsizeMode="tail"
												style={StyleSheet.flatten([styles.marginRight5, styles.colorGreen])}>
												{item.title}
											</ListItem.Title>
										</View>
										<ListItem.Subtitle style={styles.colorGreen} numberOfLines={1} ellipsizeMode="tail">
											{item.subtitle}
										</ListItem.Subtitle>
									</View>
								) : (
									<View>
										<View style={StyleSheet.flatten([styles.flexRow, styles.alignCenter])}>
											<ListItem.Title numberOfLines={1} ellipsizeMode="tail" style={styles.marginRight5}>
												{item.title}
											</ListItem.Title>
										</View>
										<ListItem.Subtitle style={styles.littleGreyText} numberOfLines={1} ellipsizeMode="tail">
											{item.subtitle}
										</ListItem.Subtitle>
									</View>
								)}
							</View>
							{item.title === 'Facebook inc' ? (
								<View style={styles.listMoney}>
									<ListItem.Title style={StyleSheet.flatten([styles.fontSize25, styles.colorGreen])}>
										{item.dollars}
									</ListItem.Title>
									<ListItem.Title style={StyleSheet.flatten([styles.fontSize20, styles.colorGreen])}>
										{item.cents}
									</ListItem.Title>
								</View>
							) : (
								<View style={styles.listMoney}>
									<ListItem.Title style={styles.fontSize25}>{item.dollars}</ListItem.Title>
									<ListItem.Title style={styles.fontSize20}>{item.cents}</ListItem.Title>
								</View>
							)}
						</View>
					</ListItem.Content>
				</ListItem>
			))}
		</View>
	);
};
export const ListOfJul10 = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<View>
			{list10.map(item => (
				<ListItem
					key={item.id}
					bottomDivider
					containerStyle={styles.borderRadius10}
					hasTVPreferredFocus={undefined}
					tvParallaxProperties={undefined}>
					<ListItem.Content>
						<View style={styles.flexRow}>
							<View style={styles.width190}>
								<View style={styles.flexRow}>
									{item.title === 'Transfer from savings' ? (
										<ListItem.Title
											numberOfLines={1}
											ellipsizeMode="tail"
											style={StyleSheet.flatten([styles.marginRight5, styles.colorGreen])}>
											{item.title}
										</ListItem.Title>
									) : (
										<ListItem.Title numberOfLines={1} ellipsizeMode="tail" style={styles.marginRight5}>
											{item.title}
										</ListItem.Title>
									)}
								</View>
								<ListItem.Subtitle style={styles.littleGreyText} numberOfLines={1} ellipsizeMode="tail">
									{item.subtitle}
								</ListItem.Subtitle>
							</View>
							{item.title === 'Transfer from savings' ? (
								<View style={styles.listMoney}>
									<ListItem.Title style={StyleSheet.flatten([styles.fontSize25, styles.colorGreen])}>
										{item.dollars}
									</ListItem.Title>
									<ListItem.Title style={StyleSheet.flatten([styles.fontSize20, styles.colorGreen])}>
										{item.cents}
									</ListItem.Title>
								</View>
							) : (
								<View style={styles.listMoney}>
									<ListItem.Title style={styles.fontSize25}>{item.dollars}</ListItem.Title>
									<ListItem.Title style={styles.fontSize20}>{item.cents}</ListItem.Title>
								</View>
							)}
						</View>
					</ListItem.Content>
				</ListItem>
			))}
		</View>
	);
};

const useStyles = StyleSheet.create(
	(theme: ReactNativePaper.Theme): ICheckingListStyles => ({
		title: {
			color: 'white',
			fontWeight: 'bold',
			fontSize: 20,
			alignSelf: 'center',
		},
		subtitle: {
			color: 'white',
			fontSize: 10,
		},
		totalAvailableCash: {
			alignSelf: 'center',
			color: 'grey',
			marginTop: 3,
			fontSize: 17,
			fontWeight: '300',
		},
		moneyBig: {
			fontSize: 40,
			alignSelf: 'center',
			fontWeight: '300',
		},
		moneyLittle: {
			fontSize: 30,
			alignSelf: 'center',
		},
		littleGreyText: {
			color: 'grey',
		},
		listMoney: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'flex-end',
			flex: 1,
		},
		borderRadius10: {
			borderRadius: 10,
			backgroundColor: `${theme === CustomDefaultTheme ? 'white' : CustomDarkTheme.colors.content}`,
		},
		flexRow: {flexDirection: 'row'},
		width190: {maxWidth: '50%'},
		alignCenter: {alignItems: 'center'},
		marginRight5: {marginRight: 5, color: theme.colors.text},
		colorGreen: {color: theme.colors.accent},
		fontSize25: {fontSize: 25, color: theme.colors.text},
		fontSize20: {fontSize: 20, color: theme.colors.text},
	}),
);
