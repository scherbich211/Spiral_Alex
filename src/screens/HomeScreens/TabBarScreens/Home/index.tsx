import React, {useContext, useEffect, useState} from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerActions} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {ListOf} from './List';
import {
	ButtonShare,
	DateNow,
	HeaderPartsContainer,
	ImageChildren,
	ImpactText,
	TotalAvailableCash,
} from './ComponentsForHome';
import TabHeader from '../../../../components/Header/TabHeader';
import UserAvatar from '../../../../components/UserAvatar';
import {IHomeScreenStyles} from '../../../../types/home';
import {RootStackParamList} from '../../../../types';
import {IListData} from '../../../../utils/mockLists';
import {AuthContext} from '../../../../AuthProvider';
import {changeAvatarRedux, changeProfileInfo} from '../../../../redux/reducers/profile';
import {CustomDarkTheme, CustomDefaultTheme} from '../../../../theme';
import {useAppDispatch} from '../../../../hooks';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface IProps {
	navigation: HomeScreenNavigationProp;
}

interface Data {
	name: string;
	DoB: string;
	filePath: string;
}

const HomeScreen: React.FC<IProps> = props => {
	const {user} = useContext(AuthContext);
	const theme = useTheme();
	const styles = useStyles(theme);
	const dispatch = useAppDispatch();
	const [data, setData] = useState<Data>({
		name: '',
		DoB: '',
		filePath: '',
	});
	const navig = () => {
		props.navigation.navigate('Profile');
	};
	const navigate = (screen: IListData) => () => {
		props.navigation.navigate(screen.title);
	};

	useEffect(() => {
		if (data.name.length !== 0) {
			dispatch(changeProfileInfo({name: data.name, birth: data.DoB}));
			dispatch(changeAvatarRedux(data.filePath));
		}
	}, [data]);

	useEffect(() => {
		const getUser = async () => {
			await firestore()
				.collection('users')
				.doc(user.uid)
				.get()
				.then(documentSnapshot => {
					if (documentSnapshot.exists) {
						console.log('User Data', documentSnapshot.data());
						setData({
							...data,
							name: documentSnapshot.data()?.fullName,
							DoB: documentSnapshot.data()?.userBirth,
							filePath: documentSnapshot.data()?.userImg,
						});
					}
				});
		};
		getUser();
	}, []);

	return (
		<View style={styles.mainView}>
			<StatusBar barStyle="dark-content" backgroundColor={theme.colors.primary} />
			<TabHeader
				beforeText={
					<View>
						<Icon.Button
							name="ios-menu"
							size={25}
							backgroundColor={theme.colors.primary}
							onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}
							testID="Drawer-open"
						/>
					</View>
				}
				headerText="Spiral">
				<View style={styles.marginRight10}>
					<UserAvatar navig={navig} />
				</View>
			</TabHeader>
			<KeyboardAwareScrollView testID="homye">
				<DateNow />
				<View style={styles.container}>
					<View style={styles.partsContainer}>
						<TotalAvailableCash />
						<View style={styles.marginTop10}>
							<ListOf cardsScreens={navigate} />
						</View>
					</View>
					<View style={styles.partsContainer}>
						<HeaderPartsContainer />
						<ImageChildren />
						<ImpactText />
						<ButtonShare />
					</View>
				</View>
			</KeyboardAwareScrollView>
		</View>
	);
};

const useStyles = StyleSheet.create(
	(theme: ReactNativePaper.Theme): IHomeScreenStyles => ({
		mainView: {flex: 1},
		container: {
			margin: 10,
		},
		partsContainer: {
			backgroundColor: `${theme === CustomDefaultTheme ? 'white' : CustomDarkTheme.colors.content}`,
			borderRadius: 5,
			marginBottom: 20,
		},
		marginRight10: {marginRight: 10},
		marginTop10: {marginTop: 10},
	}),
);

export default HomeScreen;
