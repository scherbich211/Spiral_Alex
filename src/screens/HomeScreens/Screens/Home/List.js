import React from 'react';

import {View} from 'react-native';
import {ListItem} from 'react-native-elements';
// import Icon from "react-native-vector-icons/Ionicons";
import {Image} from 'react-native';
import styles from './style/style';

export const dollars = [1500, 5000, 500];
export const cents = [20, 20, 40];

export const list = [
	{
		title: 'Checking',
		subtitle: 'Main account (...0353)',
		icon: 'arrow-forward',
		dollars: `$${dollars[0]}`,
		cents: `.${cents[0]}`,
	},
	{
		title: 'Savings',
		subtitle: 'Buy a house (...4044)',
		icon: 'arrow-forward',
		dollars: `$${dollars[1]}`,
		cents: `.${cents[1]}`,
	},
	{
		title: 'Goodness',
		subtitle: 'Cash Rewards',
		icon: 'arrow-forward',
		dollars: `$${dollars[2]}`,
		cents: `.${cents[2]}`,
		image: '../../../../../assets/Image/email.png',
	},
];

export const ListOf = ({cardsScreens}) => {
	return (
		<View>
			{list.map((item, i) => (
				<ListItem key={i} bottomDivider onPress={() => cardsScreens(item)}>
					<ListItem.Content>
						<View style={{flexDirection: 'row'}}>
							<View style={{maxWidth: 190}}>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
									}}>
									<ListItem.Title numberOfLines={1} ellipsizeMode="tail" style={{marginRight: 5}}>
										{item.title}
									</ListItem.Title>
									{item.title === 'Goodness' ? (
										<Image source={require('../../../../../assets/Image/email.png')} />
									) : null}
								</View>
								<ListItem.Subtitle style={styles.littleGreyText} numberOfLines={1} ellipsizeMode="tail">
									{item.subtitle}
								</ListItem.Subtitle>
							</View>
							<View style={styles.listMoney}>
								<ListItem.Title style={{fontSize: 25}}>{item.dollars}</ListItem.Title>
								<ListItem.Title style={{fontSize: 20}}>{item.cents}</ListItem.Title>
								<ListItem.Chevron size={25} color="#C81A7C" />
							</View>
						</View>
					</ListItem.Content>
				</ListItem>
			))}
		</View>
	);
};
