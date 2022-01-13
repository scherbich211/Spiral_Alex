import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from './TabBar';
import {DrawerContent} from './Shared';
import CheckingStackScreen from './Screens/Checking';
import SavingsStackScreen from './Screens/Saving';
import {DrawerStackParamList} from '../../types';

const Drawer = createDrawerNavigator<DrawerStackParamList>();

const DrawerNavigator = () => {
	return (
		<Drawer.Navigator
			screenOptions={{headerShown: false}}
			// eslint-disable-next-line react/no-unstable-nested-components
			drawerContent={props => <DrawerContent {...props} />}>
			<Drawer.Screen name="HomeDrawer" component={TabNavigator} />
			<Drawer.Screen name="Checking" component={CheckingStackScreen} />
			<Drawer.Screen name="Savings" component={SavingsStackScreen} />
		</Drawer.Navigator>
	);
};

export default DrawerNavigator;
