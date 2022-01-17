import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import {useTheme} from 'react-native-paper';
import {IAccountsListStyle} from '../../../../types/accounts';
import {IListData, list} from '../../../../utils/mockLists';
// import Icon from "react-native-vector-icons/Ionicons";

interface Props {
	navigate: (screen: IListData) => () => void;
}

export const ListOfAccounts: React.FC<Props> = props => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<View style={styles.viewList}>
			{list.map(item => (
				<ListItem
					key={item.id}
					onPress={props.navigate(item)}
					style={styles.listItem}
					containerStyle={styles.borderRadius10}
					hasTVPreferredFocus={undefined}
					tvParallaxProperties={undefined}>
					<ListItem.Content>
						<View style={styles.containerHeight}>
							<View style={styles.maxWidth190}>
								<View style={styles.alignmentForHeart}>
									<ListItem.Title numberOfLines={1} ellipsizeMode="tail" style={styles.marginRight5}>
										{item.title}
									</ListItem.Title>
								</View>
								<ListItem.Subtitle style={styles.littleGreyText} numberOfLines={1} ellipsizeMode="tail">
									{item.subtitle}
								</ListItem.Subtitle>
							</View>
							<View style={styles.listMoney}>
								<ListItem.Title style={styles.fontSize25}>{item.dollars}</ListItem.Title>
								<ListItem.Title style={styles.fontSize20}>{item.cents}</ListItem.Title>
								<ListItem.Chevron size={25} color={theme.colors.primary} tvParallaxProperties={undefined} />
							</View>
						</View>
						{item.title === 'Savings' ? (
							<View style={styles.alignmentForTriangle}>
								<View style={styles.triangle} />
								<Text style={styles.greenTextUp}>Savings is up 3% from last month</Text>
							</View>
						) : null}
					</ListItem.Content>
				</ListItem>
			))}
		</View>
	);
};

const useStyles = StyleSheet.create(
	(theme: ReactNativePaper.Theme): IAccountsListStyle => ({
		littleGreyText: {
			color: 'grey',
		},
		listMoney: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'flex-end',
			flex: 1,
		},
		viewList: {
			alignItems: 'center',
			marginTop: 12,
		},
		listItem: {
			width: '90%',
			marginVertical: 8,
		},
		containerHeight: {
			flexDirection: 'row',
			height: 70,
			alignItems: 'center',
		},
		alignmentForHeart: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		triangle: {
			width: 0,
			height: 0,
			backgroundColor: 'transparent',
			borderStyle: 'solid',
			borderTopWidth: 0,
			borderRightWidth: 8,
			borderBottomWidth: 16,
			borderLeftWidth: 8,
			borderTopColor: 'transparent',
			borderRightColor: 'transparent',
			borderBottomColor: theme.colors.accent,
			borderLeftColor: 'transparent',
			marginRight: 3,
		},
		alignmentForTriangle: {
			flexDirection: 'row',
			alignSelf: 'center',
		},
		greenTextUp: {
			color: theme.colors.accent,
			fontSize: 14,
			fontWeight: '600',
		},
		borderRadius10: {borderRadius: 10},
		maxWidth190: {maxWidth: '50%'},
		marginRight5: {marginRight: 5},
		fontSize25: {fontSize: 25},
		fontSize20: {fontSize: 20},
	}),
);
