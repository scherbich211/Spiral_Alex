import * as React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../Home/style/style';
import Icon from 'react-native-vector-icons/Ionicons';

function CardsScreen({}) {
	return (
		<View style={styles.tapBar}>
			<Text>Cards screen</Text>
		</View>
	);
}

const CardsStack = createStackNavigator();

function CardsStackScreen({ navigation }) {
	return (
		<CardsStack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: '#C81A7C',
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold',
					marginLeft: '35%',
				},
			}}>
			<CardsStack.Screen
				name="Cards"
				component={CardsScreen}
				options={{
					title: 'Cards',
					headerLeft: () => (
						<Icon.Button
							name="arrow-back-outline"
							size={25}
							backgroundColor="#C81A7C"
							onPress={() => navigation.navigate('Home')}
						/>
					),
				}}
			/>
		</CardsStack.Navigator>
	);
}

export default CardsStackScreen;
