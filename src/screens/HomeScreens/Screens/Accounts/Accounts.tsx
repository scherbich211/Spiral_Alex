import React from 'react';
import { View, Text, Image, SafeAreaView, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { dollars, cents } from '../Home/List';
import { ListOfAccounts } from './List';
import styles from './style';


	interface Navig {
		navig: any;
	}

const Accounts: React.FunctionComponent<Navig> = ({ navig }: Navig): JSX.Element => {
	const data = [
		{
			data: 'someData',
		},
	];
		const navigate = (screen: any) => {
			navig.navigate(screen.title, {
				title: screen.title,
				subtitle: screen.subtitle,
			});
		};

	const renderItem = () => (
		<View>
			<View style={{ paddingTop: 30 }}>
				<View>
					<Text style={styles.moneyBig}>
						${dollars.reduce((a, b) => a + b, 0)}
						<Text style={styles.moneyLittle}>.{cents.reduce((a, b) => a + b, 0)}</Text>
					</Text>
					<Text style={styles.totalAvailableCash}>Total Available Cash</Text>
				</View>
				<View style={styles.viewImages}>
					<View style={styles.viewTextImage}>
						<Image source={require('../../../../../assets/Image/email.png')} style={{ marginHorizontal: 20 }} />
						<Text style={styles.textUnderImage}>Send</Text>
					</View>
					<View style={styles.viewTextImage}>
						<Image source={require('../../../../../assets/Image/email.png')} style={{ marginHorizontal: 20 }} />
						<Text style={styles.textUnderImage}>Pay</Text>
					</View>
					<View style={styles.viewTextImage}>
						<Image source={require('../../../../../assets/Image/email.png')} style={{ marginHorizontal: 20 }} />
						<Text style={styles.textUnderImage}>Transfer</Text>
					</View>
				</View>
			</View>
			<View>
				<View>
					<ListOfAccounts cardsScreens={navigate} />
				</View>
			</View>
		</View>
	);
  return (
		<View>
			<FlatList
				data={data}
				keyExtractor={(item, index) => index.toString()}
				renderItem={renderItem}
			/>
		</View>
	);
}

export default Accounts
