import {TextStyle, ViewStyle} from 'react-native';

export interface IProfileStyle {
	container: {
		flex: number;
	};
	Image: {
		width: number;
		height: number;
		borderRadius: number;
		marginTop: number;
		marginBottom: number;
	};
	ButtonCont: {
		marginTop: number;
	};
	editButton: ViewStyle;
	editButtonText: TextStyle;
	textInput: ViewStyle;
	errorMess: {
		color: string;
	};
	applyCancelButton: ViewStyle;
	containerPart: ViewStyle;
	greyText: TextStyle;
	nameDOB: TextStyle;
	viewCameraFile: ViewStyle;
	cameraIcon: {
		width: number;
		height: number;
		borderRadius: number;
		tintColor: string;
		backgroundColor: string;
	};
	fileIcon: {
		width: number;
		height: number;
		borderRadius: number;
		tintColor: string;
		backgroundColor: string;
	};
	viewCancelEdit: ViewStyle;
}
