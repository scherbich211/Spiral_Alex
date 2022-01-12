import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Login';
import {SingInStackParamList} from '../../types';

const Stack = createNativeStackNavigator<SingInStackParamList>();

const SignIn = (): JSX.Element => {
	return (
		<SafeAreaView style={styles.main}>
			<Stack.Navigator screenOptions={{headerShown: false}}>
				<Stack.Screen name="Login" component={Login} />
			</Stack.Navigator>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	main: {
		flex: 1,
	},
});

export default SignIn;
