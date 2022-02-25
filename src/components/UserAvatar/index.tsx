import React, {useContext, useState} from 'react';
import {TouchableWithoutFeedback, StyleSheet, Modal, Platform, View} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import {AuthContext} from '../../AuthProvider';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {clearProfileInfo} from '../../redux/reducers/profile';
import {clearUserInfo, changeUserIsLoggedIn} from '../../redux/reducers/user';

const styles = StyleSheet.create({
	userMenuContent: {
		position: 'absolute',
		top: Platform.OS === 'ios' ? 90 : 55,
		right: 10,
		width: 100,
	},
	userMenuOverlay: StyleSheet.absoluteFillObject,
});

interface IProps {
	navig: () => void;
}
const UserAvatar: React.FC<IProps> = props => {
	const {logout} = useContext(AuthContext);
	const dispatch = useAppDispatch();
	const {avatar} = useAppSelector(state => state.profile);
	const [userMenuVisible, setUserMenuVisible] = useState(false);

	const hideUserMenu = () => {
		setUserMenuVisible(false);
	};
	const showUserMenu = () => {
		setUserMenuVisible(true);
	};

	const SignOut = () => {
		dispatch(clearProfileInfo);
		dispatch(clearUserInfo);
		dispatch(changeUserIsLoggedIn(false));
		logout();
	};
	const Profile = () => {
		props.navig();
	};

	return (
		<View>
			<Avatar rounded source={{uri: avatar}} onPress={showUserMenu} />
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
