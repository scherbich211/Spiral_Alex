import { StyleSheet, Platform, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { View } from 'react-native-animatable';

interface StyleAccounts {
	title: TextStyle;
	subtitle: TextStyle;
	totalAvailableCash: TextStyle;
	moneyBig: TextStyle;
	moneyLittle: TextStyle;
	littleGreyText: TextStyle;
	listMoney: ViewStyle;
	listHeader: ViewStyle;
	inputButton: ViewStyle;
	buttonFilter: ViewStyle;
	viewList: ViewStyle;
	viewRowCenter: ViewStyle;
	styleImage: ImageStyle;
	imageContainer: ViewStyle;
	headerBackground: ViewStyle;
	viewInterestGoodness: ViewStyle;
	viewInterestGoodnessView: ViewStyle;
	viewInterestGoodnessText: TextStyle;
	viewInterestGoodnessAmount: TextStyle
}

const styles: StyleAccounts = StyleSheet.create({
	title: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 20,
		alignSelf: 'center',
	},
	subtitle: {
		color: 'white',
		fontSize: 10,
	},
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
	listMoney: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		flex: 1,
	},
	listHeader: {
		flexDirection: 'row',
		marginHorizontal: 20,
		alignContent: 'center',
	},
	inputButton: {
		backgroundColor: 'white',
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
	viewList: {
		marginHorizontal: 10,
		marginTop: 20,
	},
	viewRowCenter: {
		flexDirection: 'row',
		alignItems: 'center',
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
		backgroundColor: 'white',
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
    color: '#62CA88'
  },
});

export default styles;
