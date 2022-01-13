import {StyleSheet, Platform, Dimensions} from 'react-native';

const styles = StyleSheet.create({
	tapBar: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	tapBarElements: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: Platform.OS === 'ios' ? 10 : 20,
	},
	topBar: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		height: 50,
	},
	topBarImage: {
		height: Platform.OS === 'ios' ? '49%' : '50%',
		width: Platform.OS === 'ios' ? '24%' : '11%',
		tintColor: '#fff',
	},
	topBarText: {
		marginLeft: 5,
		color: '#fff',
		fontSize: 18,
		lineHeight: 18,
	},
	screenView: {
		flex: 1,
		flexGrow: 1,
		backgroundColor: '#E8E8ED',
	},
	container: {
		margin: 10,
	},
	partsContainer: {
		backgroundColor: '#fff',
		borderRadius: 5,
		marginBottom: 20,
	},
	button: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff',
		paddingVertical: 10,
		paddingLeft: 10,
		borderBottomColor: '#E8E8ED',
		borderBottomWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

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
	littleGreyText: {
		color: 'grey',
	},
	greyUnderAccountsCash: {
		alignSelf: 'center',
		color: 'grey',
		marginTop: 3,
		fontSize: 12,
	},
	blurView: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
	},
	listMoney: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		flex: 1,
	},
});

export default styles;
