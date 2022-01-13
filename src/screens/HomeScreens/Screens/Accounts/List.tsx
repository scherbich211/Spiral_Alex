import React from 'react';

import {Text, View, Image} from 'react-native';
import {ListItem} from 'react-native-elements';
// import Icon from "react-native-vector-icons/Ionicons";
import styles from './style';

import {list} from '../Home/List';

export const ListOfAccounts = ({cardsScreens}: unknown) => {
	return (
		<View style={styles.viewList}>
			{list.map((item, i) => (
				<ListItem
					key={i}
					onPress={() => cardsScreens(item)}
					style={styles.listItem}
					containerStyle={{borderRadius: 10}}>
					<ListItem.Content>
						<View style={styles.containerHeight}>
							<View style={{maxWidth: 190}}>
								<View style={styles.alignmentForHeart}>
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
