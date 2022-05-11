/* eslint-disable react/no-unstable-nested-components */
import React, {useContext} from 'react';
import {View, StyleSheet, Switch, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView, DrawerItem, DrawerContentComponentProps} from '@react-navigation/drawer';
import {Avatar, Text, Title, Paragraph, Drawer, Caption, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {clearAvatar, clearProfileInfo} from '../../redux/reducers/profile';
import {changeUserIsLoggedIn, clearUserInfo} from '../../redux/reducers/user';
import {AuthContext} from '../../AuthProvider';
import {PreferencesContext} from '../../theme';

export const DrawerContent = (props: DrawerContentComponentProps) => {
	const {logout} = useContext(AuthContext);
	const {toggleTheme, darkMode} = React.useContext(PreferencesContext);
	const theme = useTheme();
	const dispatch = useAppDispatch();
	const {
		avatar,
		userInfo: {name},
	} = useAppSelector(state => state.profile);
	const {email} = useAppSelector(state => state.user.login);

	// const toggleTheme = () => {
	// 	console.log(1);
	// 	dispatch(changeDarkMode(!darkMode));
	// };

	const SignOut = () => {
		dispatch(clearProfileInfo);
		dispatch(clearUserInfo);
		dispatch(clearAvatar);
		dispatch(changeUserIsLoggedIn(false));
		logout();
	};

	return (
		<View style={styles.drawerContent}>
			<DrawerContentScrollView {...props}>
				<View style={styles.drawerContent}>
					<View style={styles.useInfoSection}>
						<View style={styles.instaContainer}>
							<Avatar.Image source={{uri: avatar}} />
							<View style={styles.boldText}>
								<Title style={styles.title}>{name}</Title>
								<Caption style={styles.caption}>{email}</Caption>
							</View>
						</View>
						<View style={styles.row}>
							<View style={styles.section}>
								<Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
								<Caption style={styles.caption}>Following</Caption>
							</View>
							<View style={styles.section}>
								<Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
								<Caption style={styles.caption}>Followers</Caption>
							</View>
						</View>
					</View>
					<Drawer.Section style={styles.drawerSection}>
						<DrawerItem
							icon={() => <Entypo name="home" size={25} color={theme.colors.disabled} testID="home" />}
							label="Home"
							onPress={() => {
								props.navigation.navigate('Home');
							}}
						/>
						<DrawerItem
							icon={() => <IconMaterial name="assignment" size={25} color={theme.colors.disabled} testID="Accounts" />}
							label="Accounts"
							onPress={() => {
								props.navigation.navigate('Accounts');
							}}
						/>
						<DrawerItem
							icon={() => (
								<FontAwesome5 name="hand-holding-heart" size={25} color={theme.colors.disabled} testID="Givings" />
							)}
							label="Givings"
							onPress={() => {
								props.navigation.navigate('Giving');
							}}
						/>
						<DrawerItem
							icon={() => <IconMaterial name="payments" size={25} color={theme.colors.disabled} testID="Payments" />}
							label="Payments"
							onPress={() => {
								props.navigation.navigate('Payments');
							}}
						/>
						<DrawerItem
							icon={() => <Entypo name="credit-card" size={25} color={theme.colors.disabled} testID="Cards" />}
							label="Cards"
							onPress={() => {
								props.navigation.navigate('Cards');
							}}
						/>
					</Drawer.Section>
					<Drawer.Section title="Preferences">
						<TouchableOpacity
							onPress={() => {
								toggleTheme();
							}}
							testID="toggle">
							<View style={styles.preference}>
								<Text>Dark Theme</Text>
								<View pointerEvents="none">
									<Switch value={darkMode} />
								</View>
							</View>
						</TouchableOpacity>
					</Drawer.Section>
				</View>
			</DrawerContentScrollView>
			<Drawer.Section style={styles.bottomDrawerSection}>
				<DrawerItem
					icon={({color, size}) => <Icon name="exit-to-app" color={color} size={size} testID="out" />}
					label="Sign-Out"
					onPress={SignOut}
				/>
			</Drawer.Section>
		</View>
	);
};

const styles = StyleSheet.create({
	drawerContent: {
		flex: 1,
	},
	useInfoSection: {
		paddingLeft: 20,
	},
	title: {
		fontSize: 16,
		marginTop: 3,
		fontWeight: 'bold',
	},
	caption: {
		fontSize: 14,
		lineHeight: 14,
	},
	row: {
		marginTop: 20,
		flexDirection: 'row',
		alignItems: 'center',
	},
	section: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 15,
	},
	paragraph: {
		fontWeight: 'bold',
		marginRight: 3,
	},
	drawerSection: {
		marginTop: 15,
	},
	bottomDrawerSection: {
		marginBottom: 15,
		borderTopColor: 'red',
		borderTopWidth: 1,
	},
	preference: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
	instaContainer: {flexDirection: 'row', marginTop: 15},
	boldText: {marginLeft: 15, flexDirection: 'column', width: '50%'},
});

export default styles;
