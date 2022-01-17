import * as React from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTheme} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack';
import UserAvatar from '../../../../components/UserAvatar/index';
import {ListOfAccounts} from './List';
import TabHeader from '../../../../components/Header/TabHeader';
import {IAccountsStyle} from '../../../../types/accounts';
import {RootStackParamList} from '../../../../types';
import SendImage from '../../../../../assets/Image/circleButtonSend.png';
import PayImage from '../../../../../assets/Image/circleButtonPay.png';
import CheckImage from '../../../../../assets/Image/circleButtonChecking.png';
import {cents, dollars, IListData} from '../../../../utils/mockLists';

type AccountsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Accounts'>;

interface IProps {
	navigation: AccountsScreenNavigationProp;
}

const AccountsScreen: React.FC<IProps> = (props): JSX.Element => {
	const theme = useTheme();
	const styles = useStyles();

	const navig = () => {
		props.navigation.navigate('Cards'); // Profile
	};

	const navigate = (screen: IListData) => () => {
		props.navigation.navigate(screen.title);
	};

	return (
		<View>
			<StatusBar barStyle="dark-content" />
			<TabHeader
				beforeText={
					<View>
						<Icon.Button
							name="arrow-back"
							size={25}
							backgroundColor={theme.colors.primary}
							onPress={() => props.navigation.goBack()}
						/>
					</View>
				}
				headerText="Accounts">
				<View style={styles.marginRight10}>
					<UserAvatar navig={navig} />
				</View>
			</TabHeader>
			<KeyboardAwareScrollView>
				<View>
					<View style={styles.paddingTop30}>
						<View>
							<Text style={styles.moneyBig}>
								${dollars.reduce((a, b) => a + b, 0)}
								<Text style={styles.moneyLittle}>.{cents.reduce((a, b) => a + b, 0)}</Text>
							</Text>
							<Text style={styles.totalAvailableCash}>Total Available Cash</Text>
						</View>
						<View style={styles.viewImages}>
							<View style={styles.viewTextImage}>
								<Image source={SendImage} style={styles.horizontalImage20} />
								<Text style={styles.textUnderImage}>Send</Text>
							</View>
							<View style={styles.viewTextImage}>
								<Image source={PayImage} style={styles.horizontalImage20} />
								<Text style={styles.textUnderImage}>Pay</Text>
							</View>
							<View style={styles.viewTextImage}>
								<Image source={CheckImage} style={styles.horizontalImage20} />
								<Text style={styles.textUnderImage}>Transfer</Text>
							</View>
						</View>
					</View>
					<View>
						<View>
							<ListOfAccounts navigate={navigate} />
						</View>
					</View>
				</View>
			</KeyboardAwareScrollView>
		</View>
	);
};

const useStyles = StyleSheet.create(
	(): IAccountsStyle => ({
		totalAvailableCash: {
			alignSelf: 'center',
			color: 'grey',
			marginTop: 3,
			fontSize: 17,
			fontWeight: '300',
		},
		moneyBig: {
			fontSize: 40,
			alignSelf: 'center',
			fontWeight: '300',
		},
		moneyLittle: {
			fontSize: 30,
			alignSelf: 'center',
		},
		viewImages: {
			flexDirection: 'row',
			alignSelf: 'center',
			paddingTop: 15,
		},
		viewTextImage: {
			flexDirection: 'column',
			alignItems: 'center',
		},
		textUnderImage: {
			color: 'grey',
			fontSize: 15,
			fontWeight: '400',
		},
		marginRight10: {marginRight: 10},
		paddingTop30: {paddingTop: 30},
		horizontalImage20: {marginHorizontal: 20},
	}),
);

export default AccountsScreen;
