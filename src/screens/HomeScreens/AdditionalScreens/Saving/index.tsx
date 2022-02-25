import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStackParamList} from '../../../../types';
import {ISavingsStyles} from '../../../../types/saving';
import {ListData} from './List';
import Graphic from '../../../../../assets/Image/savingsGraphV2.png';
import TabHeader from '../../../../components/Header/TabHeader';
import UserAvatar from '../../../../components/UserAvatar';
import Typography from '../../../../components/Typography';

type SavingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Savings'>;

interface IProps {
	navigation: SavingsScreenNavigationProp;
}
interface Data {
	data: string;
}
const data: Array<Data> = [{data: 'some data'}];

const SavingsScreen: React.FC<IProps> = (props): JSX.Element => {
	const theme = useTheme();
	const styles = useStyles();

	const navig = () => {
		props.navigation.navigate('Profile'); // Profile
	};

	const renderItem = () => (
		<View>
			<ListData />
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
				headerText="Savings">
				<View style={styles.marginRight10}>
					<UserAvatar navig={navig} />
				</View>
			</TabHeader>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={(index): string => index.toString()}
				ListHeaderComponent={
					<View>
						<View style={styles.headerBackground}>
							<View>
								<Typography style={styles.moneyBig}>
									$5,000
									<Typography style={styles.moneyLittle}>.20</Typography>
								</Typography>
								<Typography style={styles.totalAvailableCash}>Total Available Cash</Typography>
							</View>
							<View style={styles.imageContainer}>
								<Image source={Graphic} style={styles.styleImage} />
							</View>
						</View>
						<View style={styles.viewInterestGoodness}>
							<View style={{...styles.viewInterestGoodnessView, ...styles.marginBottom10}}>
								<Typography style={styles.viewInterestGoodnessText}>Total interest gained</Typography>
								<Typography style={styles.viewInterestGoodnessAmount}>+$50.00</Typography>
							</View>
							<View style={styles.viewInterestGoodnessView}>
								<Typography style={styles.viewInterestGoodnessText}>Goodness points Gained</Typography>
								<Text style={styles.viewInterestGoodnessAmount}>+$600</Text>
							</View>
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
	(): ISavingsStyles => ({
		mainView: {flex: 1, paddingBottom: 30},
		marginRight10: {marginRight: 10},
		marginBottom10: {marginBottom: 10},
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
		listHeader: {
			flexDirection: 'row',
			marginHorizontal: 20,
			alignContent: 'center',
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
		styleImage: {
			resizeMode: 'contain',
			width: '100%',
		},
		imageContainer: {
			marginRight: 10,
			alignItems: 'center',
		},
		headerBackground: {
			paddingTop: 30,
		},
		viewInterestGoodness: {
			marginHorizontal: 35,
			marginVertical: 20,
		},
		viewInterestGoodnessView: {
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
		viewInterestGoodnessText: {
			fontSize: 16,
			fontWeight: '400',
		},
		viewInterestGoodnessAmount: {
			fontSize: 16,
			fontWeight: '500',
			color: '#62CA88',
		},
	}),
);

export default SavingsScreen;
