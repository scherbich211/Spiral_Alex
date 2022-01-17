import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from './TabBar';
import CheckingStackScreen from './AdditionalScreens/Checking';
import SavingsStackScreen from './AdditionalScreens/Saving';
import {DrawerStackParamList} from '../../types';
import {DrawerContent} from './DrawerComponent';
import Profile from './AdditionalScreens/Profile/Profile';

const Drawer = createDrawerNavigator<DrawerStackParamList>();

const DrawerNavigator = () => {
	return (
		// eslint-disable-next-line react/no-unstable-nested-components
		<Drawer.Navigator screenOptions={{headerShown: false}} drawerContent={props => <DrawerContent {...props} />}>
			<Drawer.Screen name="HomeDrawer" component={TabNavigator} />
			<Drawer.Screen name="Checking" component={CheckingStackScreen} />
			<Drawer.Screen name="Savings" component={SavingsStackScreen} />
			<Drawer.Screen name="Goodness" component={SavingsStackScreen} />
			<Drawer.Screen name="Profile" component={Profile} />
		</Drawer.Navigator>
	);
};

export default DrawerNavigator;
