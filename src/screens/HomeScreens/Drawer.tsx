import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from './TabBar';
import CheckingStackScreen from './Screens/Checking';
import SavingsStackScreen from './Screens/Saving';
import {DrawerStackParamList} from '../../types';
import {DrawerContent} from './DrawerComponent';

const Drawer = createDrawerNavigator<DrawerStackParamList>();

const DrawerNavigator = () => {
	return (
		// eslint-disable-next-line react/no-unstable-nested-components
		<Drawer.Navigator screenOptions={{headerShown: false}} drawerContent={props => <DrawerContent {...props} />}>
			<Drawer.Screen name="HomeDrawer" component={TabNavigator} />
			<Drawer.Screen name="Checking" component={CheckingStackScreen} />
			<Drawer.Screen name="Savings" component={SavingsStackScreen} />
			<Drawer.Screen name="Goodness" component={SavingsStackScreen} />
		</Drawer.Navigator>
	);
};

export default DrawerNavigator;
