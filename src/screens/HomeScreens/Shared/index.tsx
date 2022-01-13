import React from 'react';
import {View, Image} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Text, Title, Paragraph, Drawer, Caption, TouchableRipple, Switch} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles/style';
import {useAppDispatch} from '../../../hooks';
import {clearProfileInfo} from '../../../redux/reducers/profile';
import {changeUserIsLoggedIn, clearUserInfo} from '../../../redux/reducers/user';

export const DrawerContent = props => {
	const dispatch = useAppDispatch();
	const [isDarkTheme, setIsDarkTheme] = React.useState(false);
	const toggleTheme = () => {
		setIsDarkTheme(!isDarkTheme);
	};

	const SignOut = () => {
		dispatch(clearProfileInfo);
		dispatch(clearUserInfo);
		dispatch(changeUserIsLoggedIn(false));
	};

	return (
		<View style={{flex: 1}}>
			<DrawerContentScrollView {...props}>
				<View style={styles.drawerContent}>
					<View style={styles.useInfoSection}>
						<View style={{flexDirection: 'row', marginTop: 15}}>
							<Avatar.Image source={require('../../../../assets/Image/email.png')} />
							<View style={{marginLeft: 15, flexDirection: 'column'}}>
								<Title style={styles.title}>Bald Dick</Title>
								<Caption style={styles.caption}>@balddick</Caption>
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
							icon={() => (
								<View>
									<Image source={require('../../../../assets/Image/email.png')} resizeMode="contain" />
								</View>
							)}
							label="Home"
							onPress={() => {
								props.navigation.navigate('Home');
							}}
						/>
						<DrawerItem
							icon={() => (
								<View>
									<Image source={require('../../../../assets/Image/email.png')} resizeMode="contain" />
								</View>
							)}
							label="Accounts"
							onPress={() => {
								props.navigation.navigate('Accounts');
							}}
						/>
						<DrawerItem
							icon={() => (
								<View>
									<Image source={require('../../../../assets/Image/email.png')} resizeMode="contain" />
								</View>
							)}
							label="Givings"
							onPress={() => {
								props.navigation.navigate('Giving');
							}}
						/>
						<DrawerItem
							icon={() => (
								<View>
									<Image source={require('../../../../assets/Image/email.png')} resizeMode="contain" />
								</View>
							)}
							label="Payments"
							onPress={() => {
								props.navigation.navigate('Payments');
							}}
						/>
						<DrawerItem
							icon={() => (
								<View>
									<Image source={require('../../../../assets/Image/email.png')} resizeMode="contain" />
								</View>
							)}
							label="Cards"
							onPress={() => {
								props.navigation.navigate('Cards');
							}}
						/>
					</Drawer.Section>
					<Drawer.Section title="Preferences">
						<TouchableRipple
							onPress={() => {
								toggleTheme();
							}}>
							<View style={styles.preference}>
								<Text>Dark Theme</Text>
								<View pointerEvents="none">
									<Switch value={isDarkTheme} />
								</View>
							</View>
						</TouchableRipple>
					</Drawer.Section>
				</View>
			</DrawerContentScrollView>
			<Drawer.Section style={styles.bottomDrawerSection}>
				<DrawerItem
					icon={({color, size}) => <Icon name="exit-to-app" color={color} size={size} />}
					label="Sign-Out"
					onPress={SignOut}
				/>
			</Drawer.Section>
		</View>
	);
};
