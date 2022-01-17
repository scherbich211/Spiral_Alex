import React, {useState} from 'react';
import {TouchableWithoutFeedback, StyleSheet, Modal, Platform, View} from 'react-native';

import {Avatar, ListItem} from 'react-native-elements';

import avatarImage from '../../../assets/Image/pidor.png';

const styles = StyleSheet.create({
	userMenuContent: {
		position: 'absolute',
		top: Platform.OS === 'ios' ? 90 : 55,
		right: 10,
		width: 100,
	},
	userMenuOverlay: StyleSheet.absoluteFillObject,
});
const UserAvatar = ({navig, able}) => {
	const [userMenuVisible, setUserMenuVisible] = useState(false);

	const hideUserMenu = () => {
		setUserMenuVisible(false);
	};
	const showUserMenu = () => {
		if (able === true) {
			setUserMenuVisible(true);
		}
	};

	const SignOut = () => {};
	const Profile = () => {
		navig();
	};

	return (
		<View>
			<Avatar rounded source={avatarImage} onPress={showUserMenu} />
			<Modal visible={userMenuVisible} transparent>
				<TouchableWithoutFeedback onPress={hideUserMenu}>
					<View style={styles.userMenuOverlay} />
				</TouchableWithoutFeedback>
				<ListItem style={styles.userMenuContent} hasTVPreferredFocus={undefined} tvParallaxProperties={undefined}>
					<ListItem.Content>
						<ListItem.Title onPress={Profile}>Profile</ListItem.Title>
						<ListItem.Title onPress={SignOut}>Log out</ListItem.Title>
					</ListItem.Content>
				</ListItem>
			</Modal>
		</View>
	);
};
export default UserAvatar;
