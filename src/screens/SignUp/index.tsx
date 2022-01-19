import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SingUpStackParamList} from '../../types';
import Registration from './SignUp';
import CreatePassword from './Password';
import Welcome from './Welcome';

const Stack = createNativeStackNavigator<SingUpStackParamList>();

const SignUp = (): JSX.Element => {
	return (
		<SafeAreaView style={styles.main}>
			<Stack.Navigator screenOptions={{headerShown: false}}>
				<Stack.Screen name="Registration" component={Registration} />
				<Stack.Screen name="CreatePassword" component={CreatePassword} />
				<Stack.Screen name="Welcome" component={Welcome} />
			</Stack.Navigator>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	main: {
		flex: 1,
	},
});

export default SignUp;
