/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import {Platform, StyleSheet, ImageStyle, TextStyle, ViewStyle} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useTheme} from 'react-native-paper';
import HomeStackScreen from './TabBarScreens/Home/index';
import AccountsStackScreen from './TabBarScreens/Accounts/index';
import GivingStackScreen from './TabBarScreens/Giving/index';
import CardsStackScreen from './TabBarScreens/Cards/index';
import {CustomDefaultTheme, CustomDarkTheme, SIZES} from '../../theme';
import {TabBarStackParamList} from '../../types';
import PaymentsScreen from './TabBarScreens/Payments/index';

export interface TabBarStyles {
	imageTabBar?: ImageStyle;
	textTabBar?: TextStyle;
	tabBar?: ViewStyle;
}

const TabNavigator = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const Tab = createBottomTabNavigator<TabBarStackParamList>();

	return (
		<Tab.Navigator
			screenOptions={{
				tabBarActiveTintColor: theme.colors.primary,
				tabBarInactiveTintColor: theme.colors.disabled,
				tabBarLabelStyle: styles.textTabBar,
				tabBarStyle: styles.tabBar,
				headerShown: false,
			}}>
			<Tab.Screen
				name="Home"
				component={HomeStackScreen}
				options={{
					tabBarIcon: ({focused}) => (
						<Entypo
							name="home"
							size={25}
							color={focused ? theme.colors.primary : theme.colors.disabled}
							style={styles.imageTabBar}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Accounts"
				component={AccountsStackScreen}
				options={{
					tabBarIcon: ({focused}) => (
						<IconMaterial
							name="assignment"
							size={25}
							color={focused ? theme.colors.primary : theme.colors.disabled}
							style={styles.imageTabBar}
						/>
					),
				}}
				hand-holding-heart
			/>
			<Tab.Screen
				name="Giving"
				component={GivingStackScreen}
				options={{
					tabBarIcon: ({focused}) => (
						<FontAwesome5
							name="hand-holding-heart"
							size={25}
							color={focused ? theme.colors.primary : theme.colors.disabled}
							style={styles.imageTabBar}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Payments"
				component={PaymentsScreen}
				options={{
					tabBarIcon: ({focused}) => (
						<IconMaterial
							name="payments"
							size={25}
							color={focused ? theme.colors.primary : theme.colors.disabled}
							style={styles.imageTabBar}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Cards"
				component={CardsStackScreen}
				options={{
					tabBarIcon: ({focused}) => (
						<Entypo
							name="credit-card"
							size={25}
							color={focused ? theme.colors.primary : theme.colors.disabled}
							style={styles.imageTabBar}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
};

const useStyles = StyleSheet.create(
	(theme: ReactNativePaper.Theme): TabBarStyles => ({
		imageTabBar: {marginTop: 10},
		textTabBar: {fontSize: 12, marginTop: 5},
		tabBar: {
			height: Platform.OS === 'ios' ? SIZES.height * 0.1 : SIZES.height * 0.09,
			backgroundColor: `${theme === CustomDefaultTheme ? 'white' : CustomDarkTheme.colors.backdrop}`,
		},
	}),
);

export default TabNavigator;
