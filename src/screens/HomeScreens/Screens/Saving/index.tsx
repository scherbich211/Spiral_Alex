import * as React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import UserAvatar from '../../../../components/UserAvatar/index';
import CustomHeader from '../../CustomHeader/index';
import Saving from './Saving';
import styles from './styles';

const SavingsScreen = () =>{
	return (
		<View >
			<Saving />
		</View>
	);
}

const SavingsStack = createStackNavigator();

function SavingsStackScreen({ navigation, route }: any) {
	const { title, subtitle } = route.params;
	return (
		<SavingsStack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: '#C81A7C',
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold',
					alignSelf: 'center',
				},
				headerTitle: () => (
          <CustomHeader
            title={title}
            subtitle={subtitle}
            stylesTitle={styles.title}
            stylesSubtitle={styles.subtitle} />
				),
			}}>
			<SavingsStack.Screen
				name="Savings"
				component={SavingsScreen}
				options={{
					headerLeft: () => (
						<Icon.Button
							name="arrow-back-outline"
							size={25}
							backgroundColor="#C81A7C"
							onPress={() => navigation.goBack()}
						/>
					),
					headerRight: () => (
						<View style={{ marginRight: 10 }}>
							<UserAvatar navig={''} able={false} />
						</View>
					),
				}}
			/>
		</SavingsStack.Navigator>
	);
}

export default SavingsStackScreen;
