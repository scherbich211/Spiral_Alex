import React from 'react';

import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import styles from './styles';

export const list = [
			{
				title: 'End day balance - Jul 11',
				dollars: '$10,000',
			},
			{
				title: 'Deposit',
				subtitle: 'Jul 11',
				dollars: '$2,000',
				cents: '.00',
			},
			{
				title: 'Deposit',
				subtitle: 'Jul 11',
				dollars: '$2,000',
				cents: '.00',
			},
			{
				title: 'Deposit',
				subtitle: 'Jul 11',
				dollars: '$2,000',
				cents: '.00',
			},
			{
				title: 'Deposit',
				subtitle: 'Jul 11',
				dollars: '$2,000',
				cents: '.00',
			},
			{
				title: 'Deposit',
				subtitle: 'Jul 11',
				dollars: '$2,000',
				cents: '.00',
			},
			{
				title: 'End day balance - Jul 10',
				dollars: '$3,000',
				cents: '.00',
			},
			{
				title: 'Deposit',
				subtitle: 'Jul 10',
				dollars: '$2,000',
				cents: '.00',
			},
			{
				title: 'Deposit',
				subtitle: 'Jul 10',
				dollars: '$500',
				cents: '.00',
			},
			{
				title: 'Deposit',
				subtitle: 'Jul 10',
				dollars: '$500',
				cents: '.00',
			},
		];

export const ListData = () => {
	return (
		<View style={styles.viewList}>
			{list.map((item, i) => (
				<ListItem key={i} bottomDivider containerStyle={{ paddingVertical: 20 }}>
					<ListItem.Content>
						<View style={{ flexDirection: 'row' }}>
							<View style={{ maxWidth: 190 }}>
								{item.subtitle ? (
									<View>
										<View style={styles.viewRowCenter}>
											<ListItem.Title
												numberOfLines={1}
												ellipsizeMode="tail"
												style={{ marginRight: 5, color: '#62CA88' }}>
												{item.title}
											</ListItem.Title>
										</View>
										<ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" style={{ color: 'grey' }}>
											{item.subtitle}
										</ListItem.Subtitle>
									</View>
								) : (
									<View>
										<View style={styles.viewRowCenter}>
											<ListItem.Title numberOfLines={1} ellipsizeMode="tail" style={{ marginRight: 5, fontSize: 15 }}>
												{item.title}
											</ListItem.Title>
										</View>
									</View>
								)}
							</View>
							{item.subtitle ? (
								<View style={styles.listMoney}>
									<ListItem.Title style={{ fontSize: 25, color: '#62CA88' }}>{item.dollars}</ListItem.Title>
									<ListItem.Title style={{ fontSize: 20, color: '#62CA88' }}>{item.cents}</ListItem.Title>
								</View>
							) : (
								<View style={styles.listMoney}>
									<ListItem.Title style={{ fontSize: 15 }}>{item.dollars}</ListItem.Title>
									<ListItem.Title style={{ fontSize: 10 }}>{item.cents}</ListItem.Title>
								</View>
							)}
						</View>
					</ListItem.Content>
				</ListItem>
			))}
		</View>
	);
};
