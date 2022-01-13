import * as React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../Home/style/style';
import Icon from 'react-native-vector-icons/Ionicons';

function GivingScreen({}) {
	return (
		<View style={styles.tapBar}>
			<Text>Giving screen</Text>
		</View>
	);
}

const GivingStack = createStackNavigator();

function GivingStackScreen({ navigation }) {
	return (
		<GivingStack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: '#C81A7C',
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold',
					marginLeft: '34%',
				},
			}}>
			<GivingStack.Screen
				name="Giving"
				component={GivingScreen}
				options={{
					title: 'Giving',
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
		</GivingStack.Navigator>
	);
}

export default GivingStackScreen;
