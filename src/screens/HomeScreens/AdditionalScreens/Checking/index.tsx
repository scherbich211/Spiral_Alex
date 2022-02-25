import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import TabHeader from '../../../../components/Header/TabHeader';
import Typography from '../../../../components/Typography';
import UserAvatar from '../../../../components/UserAvatar';
import {RootStackParamList} from '../../../../types';
import {ICheckingStyles} from '../../../../types/checking';
import {ListOfJul10, ListOfJul11} from './Lists';

type CheckingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Checking'>;

interface IProps {
	navigation: CheckingScreenNavigationProp;
}
interface Date {
	date: string;
}
const data1: Array<Date> = [
	{
		date: 'Jul 11',
	},
	{
		date: 'Jul 10',
	},
];

const CheckingScreen: React.FC<IProps> = (props): JSX.Element => {
	const theme = useTheme();
	const styles = useStyles(theme);

	const navig = () => {
		props.navigation.navigate('Profile'); // Profile
	};

	const renderItem = ({item}: {item: Date}): JSX.Element => (
		<View style={styles.viewItem}>
			<View>
				<Text style={styles.textItem}> {item.date}</Text>
				{item.date === 'Jul 11' ? <ListOfJul11 /> : <ListOfJul10 />}
			</View>
		</View>
	);
	return (
		<View style={styles.mainView}>
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
				headerText="Checking">
				<View style={styles.marginRight10}>
					<UserAvatar navig={navig} />
				</View>
			</TabHeader>
			<FlatList
				data={data1}
				keyExtractor={(_item: Date, index: number): string => index.toString()}
				renderItem={renderItem}
				ListHeaderComponent={
					<View style={styles.paddingTop30}>
						<View>
							<Typography style={styles.moneyBig}>
								$1,500
								<Typography style={styles.moneyLittle}>.20</Typography>
							</Typography>
							<Typography style={styles.totalAvailableCash}>Total Available Cash</Typography>
						</View>
						<View style={styles.listHeader}>
							<TextInput
								placeholder="Search transactions"
								autoCapitalize="none"
								style={styles.inputButton}
								placeholderTextColor="grey"
							/>
							<TouchableOpacity style={styles.buttonFilter}>
								<Typography style={styles.littleGreyText}>Filter by</Typography>
							</TouchableOpacity>
						</View>
					</View>
				}
			/>
		</View>
	);
};

const useStyles = StyleSheet.create(
	(theme: ReactNativePaper.Theme): ICheckingStyles => ({
		mainView: {flex: 1, paddingBottom: 30},
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
		littleGreyText: {
			color: 'grey',
		},
		viewItem: {
			marginTop: 25,
			marginHorizontal: 15,
		},
		textItem: {
			marginLeft: 20,
			marginBottom: 5,
			fontSize: 16,
			color: theme.colors.text,
		},
		listHeader: {
			flexDirection: 'row',
			marginHorizontal: 20,
			alignContent: 'center',
			marginTop: 25,
		},
		inputButton: {
			width: '70%',
			height: 30,
			borderRadius: 25,
			paddingLeft: 15,
			borderColor: 'grey',
			borderWidth: 1,
			marginRight: 10,
		},
		buttonFilter: {
			borderRadius: 25,
			width: 80,
			height: 30,
			borderColor: 'grey',
			borderWidth: 1,
			alignItems: 'center',
			justifyContent: 'center',
		},
		marginRight10: {
			marginRight: 10,
		},
		paddingTop30: {marginTop: 30},
	}),
);

export default CheckingScreen;
