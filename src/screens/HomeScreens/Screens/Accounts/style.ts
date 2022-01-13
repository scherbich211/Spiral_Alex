import { StyleSheet, Platform, ViewStyle, TextStyle } from 'react-native';

interface StyleAccounts {
	totalAvailableCash: TextStyle;
	moneyBig: TextStyle;
	moneyLittle: TextStyle;
	viewImages: ViewStyle;
	viewTextImage: ViewStyle;
	textUnderImage: TextStyle;
	littleGreyText: TextStyle;
	listMoney: ViewStyle;
	viewList: ViewStyle;
	listItem: ViewStyle;
	containerHeight: ViewStyle;
	alignmentForHeart: ViewStyle;
	triangle: ViewStyle;
	alignmentForTriangle: ViewStyle;
	greenTextUp: TextStyle,
}

const styles: StyleAccounts = StyleSheet.create({
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
	littleGreyText: {
		color: 'grey',
	},
	listMoney: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		flex: 1,
	},
	viewList: {
		alignItems: 'center',
		marginTop: 12,
	},
	listItem: {
		width: '90%',
		marginVertical: 8,
	},
	containerHeight: {
		flexDirection: 'row',
		height: 70,
		alignItems: 'center',
	},
	alignmentForHeart: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	triangle: {
		width: 0,
		height: 0,
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderTopWidth: 0,
		borderRightWidth: 8,
		borderBottomWidth: 16,
		borderLeftWidth: 8,
		borderTopColor: 'transparent',
		borderRightColor: 'transparent',
		borderBottomColor: '#62CA88',
		borderLeftColor: 'transparent',
		marginRight: 3,
	},
	alignmentForTriangle: {
		flexDirection: 'row',
		alignSelf: 'center',
	},
	greenTextUp: {
		color: '#62CA88',
		fontSize: 14,
		fontWeight: '600'
	},
});

export default styles;
