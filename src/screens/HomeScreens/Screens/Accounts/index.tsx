import * as React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import UserAvatar from '../../../../components/UserAvatar/index';
import Accounts from './Accounts';



const AccountsScreen: React.FunctionComponent = ({ navigation }: any): JSX.Element => {
	return (
		<View>
			<Accounts navig={navigation} />
		</View>
	);
};

const AccountsStack = createStackNavigator();

const AccountsStackScreen = ({ navigation }: any): JSX.Element => {
	return (
		<AccountsStack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: '#C81A7C',
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold',
					alignSelf: 'center',
				},
			}}>
			<AccountsStack.Screen
				name="Accounts"
				component={AccountsScreen}
				options={{
					title: 'Accounts',
					headerLeft: () => (
						<Icon.Button
							name="arrow-back-outline"
							size={25}
							backgroundColor="#C81A7C"
							onPress={() => navigation.navigate('Home')}
						/>
					),
					headerRight: () => (
						<View style={{ marginRight: 10 }}>
							<UserAvatar navig={''} able={false}/>
						</View>
					),
				}}
			/>
		</AccountsStack.Navigator>
	);
}

export default AccountsStackScreen;
