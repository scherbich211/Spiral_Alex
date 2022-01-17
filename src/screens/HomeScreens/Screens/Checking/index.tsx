import * as React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import UserAvatar from '../../../../components/UserAvatar/index';
import CustomHeader from '../../CustomHeader/index';
import styles from './style';
import Checking from './Checking';

const CheckingScreen = ({}) => {
	return (
		<View>
			<Checking />
		</View>
	);
};

const CheckingStack = createStackNavigator();

interface Options {
	title: string;
}

const CheckingStackScreen = ({navigation, route}: unknown) => {
	const {title, subtitle} = route.params;
	return (
		<CheckingStack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: '#C81A7C',
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					alignSelf: 'center',
				},
				headerTitle: () => (
					<CustomHeader title={title} subtitle={subtitle} stylesTitle={styles.title} stylesSubtitle={styles.subtitle} />
				),
			}}>
			<CheckingStack.Screen
				name="Checking"
				component={CheckingScreen}
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
						<View style={{marginRight: 10}}>
							<UserAvatar navig="" able={false} />
						</View>
					),
				}}
			/>
		</CheckingStack.Navigator>
	);
};

export default CheckingStackScreen;
