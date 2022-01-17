import React from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerActions} from '@react-navigation/native';
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
import {IHomeScreenStyles, IListData} from '../../../../types/home';
import {RootStackParamList} from '../../../../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface IProps {
	navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<IProps> = props => {
	const theme = useTheme();
	const styles = useStyles();
	const navig = () => {
		props.navigation.navigate('Cards'); // Profile
	};
	const navigate = (screen: IListData) => () => {
		props.navigation.navigate(
			screen.title /* , {
			title: screen.title,
			subtitle: screen.subtitle,
		} */,
		);
	};

	return (
		<View>
			<StatusBar barStyle="dark-content" />
			<TabHeader
				beforeText={
					<View>
						<Icon.Button
							name="ios-menu"
							size={25}
							backgroundColor={theme.colors.primary}
							onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}
						/>
					</View>
				}
				headerText="Spiral">
				<View style={styles.marginRight10}>
					<UserAvatar navig={navig} able={true} />
				</View>
			</TabHeader>
			<KeyboardAwareScrollView>
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
	(): IHomeScreenStyles => ({
		container: {
			margin: 10,
		},
		partsContainer: {
			backgroundColor: 'white',
			borderRadius: 5,
			marginBottom: 20,
		},
		marginRight10: {marginRight: 10},
		marginTop10: {marginTop: 10},
	}),
);

export default HomeScreen;
