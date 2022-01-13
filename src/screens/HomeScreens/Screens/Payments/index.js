import * as React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../Home/style/style';
import Icon from 'react-native-vector-icons/Ionicons';

function PaymentsScreen({}) {
	return (
		<View style={styles.tapBar}>
			<Text>Payments screen</Text>
		</View>
	);
}

const PaymentsStack = createStackNavigator();

function PaymentsStackScreen({ navigation }) {
	return (
		<PaymentsStack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: '#C81A7C',
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold',
					marginLeft: '28%',
				},
			}}>
			<PaymentsStack.Screen
				name="Payments"
				component={PaymentsScreen}
				options={{
					title: 'Payments',
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
		</PaymentsStack.Navigator>
	);
}

export default PaymentsStackScreen;
