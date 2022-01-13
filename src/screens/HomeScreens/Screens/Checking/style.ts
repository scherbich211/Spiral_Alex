import { StyleSheet, Platform, ViewStyle, TextStyle } from 'react-native';

interface StyleAccounts {
	title: TextStyle;
	subtitle: TextStyle;
	totalAvailableCash: TextStyle;
	moneyBig: TextStyle;
	moneyLittle: TextStyle;
	littleGreyText: TextStyle;
  listMoney: ViewStyle;
  viewItem: ViewStyle;
  textItem: TextStyle;
  listHeader: ViewStyle;
  inputButton: ViewStyle;
  buttonFilter: ViewStyle;
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
	viewItem: {
		marginTop: 25,
		marginHorizontal: 15,
	},
	textItem: {
		marginLeft: 20,
		marginBottom: 5,
		fontSize: 16,
	},
	listHeader: {
		flexDirection: 'row',
		marginHorizontal: 20,
		alignContent: 'center',
		marginTop: 25,
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
});

export default styles;
