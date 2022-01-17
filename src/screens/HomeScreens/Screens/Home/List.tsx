import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {useTheme} from 'react-native-paper';
import {IListData, IListStyle} from '../../../../types/home';

export const dollars = [1500, 5000, 500];
export const cents = [20, 20, 40];

export const list: IListData[] = [
	{
		id: 1,
		title: 'Checking',
		subtitle: 'Main account (...0353)',
		icon: 'arrow-forward',
		dollars: `$${dollars[0]}`,
		cents: `.${cents[0]}`,
	},
	{
		id: 2,
		title: 'Savings',
		subtitle: 'Buy a house (...4044)',
		icon: 'arrow-forward',
		dollars: `$${dollars[1]}`,
		cents: `.${cents[1]}`,
	},
	{
		id: 3,
		title: 'Goodness',
		subtitle: 'Cash Rewards',
		icon: 'arrow-forward',
		dollars: `$${dollars[2]}`,
		cents: `.${cents[2]}`,
	},
];

interface IProps {
	cardsScreens: (screen: IListData) => () => void;
}

export const ListOf: React.FC<IProps> = props => {
	const theme = useTheme();
	const styles = useStyles();
	return (
		<View>
			{list.map(item => (
				<ListItem
					key={item.id}
					bottomDivider
					onPress={props.cardsScreens(item)}
					hasTVPreferredFocus={undefined}
					tvParallaxProperties={undefined}>
					<ListItem.Content>
						<View style={styles.row}>
							<View style={styles.width190}>
								<View style={styles.rowCenter}>
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
					</ListItem.Content>
				</ListItem>
			))}
		</View>
	);
};

const useStyles = StyleSheet.create(
	(): IListStyle => ({
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
		fontSize25: {fontSize: 25},
		fontSize20: {fontSize: 20},
		marginRight5: {marginRight: 5},
		rowCenter: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		width190: {maxWidth: 190},
		row: {flexDirection: 'row'},
		littleGreyText: {
			color: 'grey',
		},
		listMoney: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'flex-end',
			flex: 1,
		},
	}),
);
