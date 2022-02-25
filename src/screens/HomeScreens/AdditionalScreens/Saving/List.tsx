import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {useTheme} from 'react-native-paper';
import {CustomDefaultTheme, CustomDarkTheme} from '../../../../theme';
import {ISavingsListStyles} from '../../../../types/saving';
import {listSavings} from '../../../../utils/mockLists';

export const ListData = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<View style={styles.viewList}>
			{listSavings.map(item => (
				<ListItem
					key={item.id}
					bottomDivider
					containerStyle={styles.paddingVertical20}
					hasTVPreferredFocus={undefined}
					tvParallaxProperties={undefined}>
					<ListItem.Content>
						<View style={styles.flexRow}>
							<View style={styles.width190}>
								{item.subtitle ? (
									<View>
										<View style={styles.viewRowCenter}>
											<ListItem.Title
												numberOfLines={1}
												ellipsizeMode="tail"
												style={StyleSheet.flatten([styles.marginRight5, styles.colorGreen])}>
												{item.title}
											</ListItem.Title>
										</View>
										<ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" style={styles.colorGrey}>
											{item.subtitle}
										</ListItem.Subtitle>
									</View>
								) : (
									<View>
										<View style={styles.viewRowCenter}>
											<ListItem.Title
												numberOfLines={1}
												ellipsizeMode="tail"
												style={StyleSheet.flatten([styles.marginRight5, styles.fontSize15])}>
												{item.title}
											</ListItem.Title>
										</View>
									</View>
								)}
							</View>
							{item.subtitle ? (
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
									<ListItem.Title style={styles.fontSize15}>{item.dollars}</ListItem.Title>
									<ListItem.Title style={styles.fontSize10}>{item.cents}</ListItem.Title>
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
	(theme: ReactNativePaper.Theme): ISavingsListStyles => ({
		listMoney: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'flex-end',
			flex: 1,
		},
		viewList: {
			marginHorizontal: 10,
			marginTop: 20,
		},
		viewRowCenter: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		colorGrey: {color: 'grey'},
		flexRow: {flexDirection: 'row'},
		width190: {maxWidth: '50%'},
		marginRight5: {marginRight: 5},
		colorGreen: {color: theme.colors.accent},
		fontSize15: {fontSize: 15, color: theme.colors.text},
		fontSize10: {fontSize: 10, color: theme.colors.text},
		fontSize25: {fontSize: 25, color: theme.colors.text},
		fontSize20: {fontSize: 20, color: theme.colors.text},
		paddingVertical20: {
			paddingVertical: 20,
			backgroundColor: `${theme === CustomDefaultTheme ? 'white' : CustomDarkTheme.colors.content}`,
			borderRadius: 10,
		},
	}),
);
