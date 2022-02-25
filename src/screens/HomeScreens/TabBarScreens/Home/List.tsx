import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {useTheme} from 'react-native-paper';
import {CustomDarkTheme, CustomDefaultTheme} from '../../../../theme';
import {IListStyle} from '../../../../types/home';
import {IListData, list} from '../../../../utils/mockLists';

interface IProps {
	cardsScreens: (screen: IListData) => () => void;
}

export const ListOf: React.FC<IProps> = props => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<View>
			{list.map(item => (
				<ListItem
					key={item.id}
					containerStyle={{
						backgroundColor: `${theme === CustomDefaultTheme ? 'white' : CustomDarkTheme.colors.content}`,
					}}
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
	(theme: ReactNativePaper.Theme): IListStyle => ({
		title: {
			fontWeight: 'bold',
			fontSize: 20,
			alignSelf: 'center',
		},
		subtitle: {
			fontSize: 10,
		},
		fontSize25: {fontSize: 25, color: theme.colors.text},
		fontSize20: {fontSize: 20, color: theme.colors.text},
		marginRight5: {marginRight: 5, color: theme.colors.text},
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
