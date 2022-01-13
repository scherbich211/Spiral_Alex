import React from 'react';

import { View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import styles from './style';

export const dollars11 = [63, 17, 1200, 320];
export const cents11 = [95, 75, 50, 73];

export const list11 = [
	{
		title: 'Target',
		subtitle: 'Closter NJ | Debit card',
		dollars: `$${dollars11[0]}`,
		cents: `.${cents11[0]}`,
	},
	{
		title: 'AplPay 7-Eleven',
		subtitle: 'Cresskill NJ | iPhone',
		dollars: `$${dollars11[1]}`,
		cents: `.${cents11[1]}`,
	},
	{
		title: 'Facebook inc',
		subtitle: 'Pay day! Yay!',
		dollars: `$${dollars11[2]}`,
		cents: `.${cents11[2]}`,
	},
	{
		title: 'Lencrafters',
		subtitle: 'Paramus NJ | Debit card',
		dollars: `$${dollars11[3]}`,
		cents: `.${cents11[3]}`,
	},
];

export const dollars10 = [10000, 12, 236, 320];
export const cents10 = [0, 2, 52, 73];

export const list10 = [
	{
		title: 'Transfer from savings',
		subtitle: 'Buy a house (...4044)',
		dollars: `$${dollars10[0]}`,
		cents: `.${cents10[0]}`,
	},
	{
		title: 'Starbucks',
		subtitle: 'Closter NJ | Debit card',
		dollars: `$${dollars10[1]}`,
		cents: `.${cents10[1]}`,
	},
	{
		title: 'Stop and Shop',
		subtitle: 'Closter NJ | Debit card',
		dollars: `$${dollars10[2]}`,
		cents: `.${cents10[2]}`,
	},
	{
		title: 'Lencrafters',
		subtitle: 'Paramus NJ | Debit card',
		dollars: `$${dollars10[3]}`,
		cents: `.${cents10[3]}`,
	},
];

export const ListOfJul11 = () => {
return (
	<View>
		{list11.map((item, i) => (
      <ListItem key={i} bottomDivider containerStyle={{borderRadius: 10}}>
				{item.title === 'Facebook inc' ? <Avatar source={require('../../../../../assets/Image/email.png')} /> : null}
				<ListItem.Content>
					<View style={{ flexDirection: 'row' }}>
						<View style={{ maxWidth: 190 }}>
							{item.title === 'Facebook inc' ? (
								<View>
									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<ListItem.Title numberOfLines={1} ellipsizeMode="tail" style={{ marginRight: 5, color: '#62CA88' }}>
											{item.title}
										</ListItem.Title>
									</View>
									<ListItem.Subtitle style={{ color: '#62CA88' }} numberOfLines={1} ellipsizeMode="tail">
										{item.subtitle}
									</ListItem.Subtitle>
								</View>
							) : (
								<View>
									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<ListItem.Title numberOfLines={1} ellipsizeMode="tail" style={{ marginRight: 5 }}>
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
								<ListItem.Title style={{ fontSize: 25, color: '#62CA88' }}>{item.dollars}</ListItem.Title>
								<ListItem.Title style={{ fontSize: 20, color: '#62CA88' }}>{item.cents}</ListItem.Title>
							</View>
						) : (
							<View style={styles.listMoney}>
								<ListItem.Title style={{ fontSize: 25 }}>{item.dollars}</ListItem.Title>
								<ListItem.Title style={{ fontSize: 20 }}>{item.cents}</ListItem.Title>
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
	return (
		<View>
			{list10.map((item, i) => (
				<ListItem key={i} bottomDivider containerStyle={{ borderRadius: 10 }}>
					<ListItem.Content>
						<View style={{ flexDirection: 'row' }}>
							<View style={{ maxWidth: 190 }}>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									{item.title === 'Transfer from savings' ? (
										<ListItem.Title numberOfLines={1} ellipsizeMode="tail" style={{ marginRight: 5, color: '#62CA88' }}>
											{item.title}
										</ListItem.Title>
									) : (
										<ListItem.Title numberOfLines={1} ellipsizeMode="tail" style={{ marginRight: 5 }}>
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
									<ListItem.Title style={{ fontSize: 25, color: '#62CA88' }}>{item.dollars}</ListItem.Title>
									<ListItem.Title style={{ fontSize: 20, color: '#62CA88' }}>{item.cents}</ListItem.Title>
								</View>
							) : (
								<View style={styles.listMoney}>
									<ListItem.Title style={{ fontSize: 25 }}>{item.dollars}</ListItem.Title>
									<ListItem.Title style={{ fontSize: 20 }}>{item.cents}</ListItem.Title>
								</View>
							)}
						</View>
					</ListItem.Content>
				</ListItem>
			))}
		</View>
	);
};
