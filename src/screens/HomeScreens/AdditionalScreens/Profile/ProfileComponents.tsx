import React from 'react';
import {ActivityIndicator, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import ButtonCustom from '../../../../components/Button';
import Typography from '../../../../components/Typography';
import {useAppSelector} from '../../../../hooks';
import {IProfileStyle} from '../../../../types/profile';

interface INormalProfileScreen {
	upload: boolean;
	editProfile: () => void;
}

interface IButtonsEdit {
	upload: boolean;
	editProfile: () => void;
	submitPost: () => Promise<void>;
	isValid: boolean;
}

export const NormalProfileScreen: React.FC<INormalProfileScreen> = props => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const {
		avatar,
		userInfo: {name, birth},
	} = useAppSelector(state => state.profile);
	return (
		<View style={styles.containerPart}>
			{props.upload ? (
				<View style={styles.containerPart}>
					<ActivityIndicator size="large" />
				</View>
			) : (
				<>
					<View>
						<Image
							source={{
								uri: avatar
									? avatar || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
									: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
							}}
							style={styles.Image}
						/>
					</View>
					<View>
						<Typography style={styles.greyText}>Full Name</Typography>
						<Typography style={styles.nameDOB}>{name}</Typography>
					</View>
					<View>
						<Typography style={styles.greyText}>Date of Birth</Typography>
						<Typography style={styles.nameDOB}>{birth}</Typography>
					</View>
				</>
			)}
			<View style={styles.ButtonCont}>
				<TouchableOpacity style={styles.editButton} onPress={() => props.editProfile()}>
					<Typography style={styles.editButtonText}>Edit Profile</Typography>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export const ButtonsEdit: React.FC<IButtonsEdit> = props => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<View style={styles.viewCancelEdit}>
			<ButtonCustom
				onPress={() => props.editProfile()}
				disabled={props.upload}
				style={styles.applyCancelButton}
				mode="contained"
				loading={props.upload}>
				Cancel
			</ButtonCustom>
			<ButtonCustom
				onPress={props.submitPost}
				disabled={!props.isValid || props.upload}
				style={styles.applyCancelButton}
				mode="contained"
				loading={props.upload}>
				Edit Profile
			</ButtonCustom>
		</View>
	);
};
const useStyles = StyleSheet.create(
	(theme: ReactNativePaper.Theme): IProfileStyle => ({
		container: {
			flex: 1,
		},
		Image: {
			width: 120,
			height: 120,
			borderRadius: 60,
			marginTop: 15,
			marginBottom: 20,
		},
		ButtonCont: {
			marginTop: 300,
		},
		editButton: {
			width: 300,
			height: 55,
			alignSelf: 'center',
			borderColor: theme.colors.primary,
			borderRadius: 50,
			backgroundColor: theme.colors.primary,
			justifyContent: 'center',
			alignItems: 'center',
			marginBottom: 15,
		},
		editButtonText: {
			color: 'white',
			fontWeight: '700',
			fontSize: 18,
			marginLeft: 5,
		},
		textInput: {
			flexDirection: 'row',
			width: 300,
		},
		errorMess: {
			color: theme.colors.primary,
		},
		applyCancelButton: {
			width: 150,
			height: 55,
			borderRadius: 50,
			justifyContent: 'center',
			marginBottom: 15,
			marginTop: 200,
		},
		containerPart: {
			alignItems: 'center',
		},
		greyText: {
			color: 'grey',
			alignSelf: 'center',
			marginTop: 20,
			marginBottom: 5,
		},
		nameDOB: {
			fontWeight: '500',
			fontSize: 16,
			alignSelf: 'center',
		},
		viewCameraFile: {
			flexDirection: 'row',
			position: 'absolute',
			justifyContent: 'space-between',
			alignItems: 'center',
			top: 115,
			width: 150,
		},
		cameraIcon: {
			width: 50,
			height: 50,
			borderRadius: 25,
			tintColor: 'white',
			backgroundColor: 'black',
		},
		fileIcon: {
			width: 50,
			height: 50,
			borderRadius: 25,
			tintColor: 'white',
			backgroundColor: 'black',
		},
		viewCancelEdit: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			width: '85%',
		},
		input: {width: '100%'},
		inputsView: {marginTop: 20},
	}),
);
