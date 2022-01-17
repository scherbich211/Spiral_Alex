import React, {useState} from 'react';
import {Image, ScrollView, View, Text, TouchableOpacity, TextInput, Alert, Platform, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import {ImageLibraryOptions, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'react-native-paper';
import {requestCameraPermission, requestExternalWritePermission} from '../../../../utils/componentsForProfile';
import {Permission, PERMISSION_TYPE} from '../../../../utils/AppPermission';
import CameraImage from '../../../../../assets/Image/camera.png';
import FileImage from '../../../../../assets/Image/file.png';
import {RootStackParamList} from '../../../../types';
import TabHeader from '../../../../components/Header/TabHeader';
import {useAppDispatch, useAppSelector} from '../../../../hooks';
import {IProfile} from '../../../../types/profileReducer';
import {changeAvatarRedux, changeProfileInfo} from '../../../../redux/reducers/profile';
import {IProfileStyle} from '../../../../types/profile';

interface Data {
	name: string;
	DoB: string;
	edit: boolean;
	check_nameInputChange: boolean;
	check_birthInputChange: boolean;
	isValidUser: boolean;
	isValidBirth: boolean;
	filePath: string;
}

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

interface IProps {
	navigation: ProfileScreenNavigationProp;
}

const ProfileScreen: React.FC<IProps> = (props): JSX.Element => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const dispatch = useAppDispatch();
	// ----------everything with input and text-------------------------------------------------------

	const {
		avatar,
		userInfo: {name, birth},
	} = useAppSelector(state => state.profile);

	const [data, setData] = useState<Data>({
		name: '',
		DoB: '',
		edit: false,
		check_nameInputChange: false,
		check_birthInputChange: false,
		isValidUser: true,
		isValidBirth: true,
		filePath: '',
	});

	const EditProfile = (): void => {
		if (data.edit === false) {
			setData({
				...data,
				edit: true,
				check_nameInputChange: false,
				check_birthInputChange: false,
			});
		} else if (data.edit === true) {
			setData({
				...data,
				edit: false,
			});
		}
	};

	// eslint-disable-next-line no-shadow
	const SuccessEdit = (name: string, birth: string, file: string): void => {
		if (data.check_birthInputChange === false || data.check_nameInputChange === false) {
			Alert.alert('Wrong Input!', 'Look at errors', [{text: 'Okay'}]);
			return;
		}
		if (data.edit === false) {
			setData({
				...data,
				edit: true,
				check_nameInputChange: false,
				check_birthInputChange: false,
			});
		} else {
			setData({
				...data,
				edit: false,
			});
			const dataToChange: IProfile['userInfo'] = {
				name,
				birth,
			};
			dispatch(changeProfileInfo(dataToChange));
			dispatch(changeAvatarRedux(file));
		}
	};

	const nameInputChange = (val: string): void => {
		if (val.length >= 4) {
			setData({
				...data,
				name: val,
				check_nameInputChange: true,
				isValidUser: true,
			});
		} else {
			setData({
				...data,
				name: val,
				check_nameInputChange: false,
				isValidUser: false,
			});
		}
	};
	const handleBirthChange = (val: string): void => {
		if (val.length >= 4) {
			setData({
				...data,
				DoB: val,
				isValidBirth: true,
				check_birthInputChange: true,
			});
		} else {
			setData({
				...data,
				DoB: val,
				isValidBirth: false,
				check_birthInputChange: false,
			});
		}
	};

	const handleValidUser = (val: string): void => {
		if (val.trim().length >= 4) {
			setData({
				...data,
				isValidUser: true,
			});
		} else {
			setData({
				...data,
				isValidUser: false,
			});
		}
	};
	// ------------------------------------------------------------------------------------------------

	// ------------files-------------------------------------------------------------------------------

	// -------------takePhoto------------------------------------------------------------
	const captureImage = async (type: ImageLibraryOptions['mediaType']): Promise<void> => {
		const options: ImageLibraryOptions = {
			mediaType: type,
			maxWidth: 600,
			maxHeight: 1100,
			quality: 1,
		};
		if (Platform.OS === 'android') {
			console.log('android');
			const isCameraPermitted: boolean = await requestCameraPermission();
			const isStoragePermitted: boolean = await requestExternalWritePermission();
			if (isCameraPermitted && isStoragePermitted) {
				launchCamera(options, response => {
					console.log('Response = ', response);
					if (response.didCancel) {
						console.warn('User cancelled camera picker');
						return;
					} else if (response.errorCode === 'camera_unavailable') {
						console.warn('Camera not available on device');
						return;
					} else if (response.errorCode === 'permission') {
						console.warn('Permission not satisfied');
						return;
					} else if (response.errorCode === 'others') {
						console.warn(response.errorMessage);
						return;
					}
					const size: number | undefined = response.assets?.find(i => i.fileSize)?.fileSize;
					const duration = response.assets?.find(i => i.duration)?.duration;

					if ((size && size.toString().length > 0) || duration) {
						if (response.assets) {
							const [asset] = response.assets;
							if (asset) {
								if (asset.uri) {
									setData({
										...data,
										filePath: asset.uri,
									});
								}
							} else {
								console.warn('no asset available');
							}
						} else {
							console.warn('no assets available');
						}
					}
				});
			}
		} else {
			const componentDidMount = (): void => {
				Permission.checkPermission(PERMISSION_TYPE.camera);
			};
			// let isCameraPermitted = requestCameraPermissionIos();
			const isCameraPermitted: void = componentDidMount();
			const isStoragePermitted: boolean = await requestExternalWritePermission();
			if (isCameraPermitted != null && isStoragePermitted != null) {
				launchCamera(options, (response): void => {
					console.log('Response = ', response);
					if (response.didCancel) {
						console.warn('User cancelled camera picker');
						return;
					} else if (response.errorCode === 'camera_unavailable') {
						console.warn('Camera not available on device');
						return;
					} else if (response.errorCode === 'permission') {
						console.warn('Permission not satisfied');
						return;
					} else if (response.errorCode === 'others') {
						console.warn(response.errorMessage);
						return;
					}
					const size: number | undefined = response.assets?.find(i => i.fileSize)?.fileSize;
					const duration = response.assets?.find(i => i.duration)?.duration;

					if ((size && size.toString().length > 0) || duration) {
						if (response.assets) {
							const [asset] = response.assets;
							if (asset) {
								if (asset.uri) {
									setData({
										...data,
										filePath: asset.uri,
									});
								}
							} else {
								console.warn('no asset available');
							}
						} else {
							console.warn('no assets available');
						}
					}
				});
			}
		}
	};
	// -------------------------------------------------------------------------

	// -------------chooseFile------------------------------------------------------------
	const chooseFile = (type: ImageLibraryOptions['mediaType']) => {
		const options: ImageLibraryOptions = {
			mediaType: type,
			maxWidth: 600,
			maxHeight: 1100,
			quality: 1,
		};
		launchImageLibrary(options, response => {
			if (response.didCancel) {
				console.warn('User cancelled camera picker');
				return;
			} else if (response.errorCode === 'camera_unavailable') {
				console.warn('Camera not available on device');
				return;
			} else if (response.errorCode === 'permission') {
				console.warn('Permission not satisfied');
				return;
			} else if (response.errorCode === 'others') {
				console.warn(response.errorMessage);
				return;
			}
			const size: number | undefined = response.assets?.find(i => i.fileSize)?.fileSize;
			if (size && size.toString().length > 0) {
				if (response.assets) {
					const [asset] = response.assets;
					if (asset) {
						if (asset.uri) {
							setData({
								...data,
								filePath: asset.uri,
							});
						}
					} else {
						console.warn('no asset available');
					}
				} else {
					console.warn('no assets available');
				}
			}
		});
	};
	// --------------------------------------------------------------------------------------

	// ------------------------------------------------------------------------------------------------

	return (
		<View style={styles.container}>
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
				headerText="Profile"
			/>
			<ScrollView>
				{data.edit === false ? (
					// -----------NORMAL-STYLE--------------------------------------------------------------------
					<View style={styles.containerPart}>
						<View>
							<Image source={{uri: avatar}} style={styles.Image} />
						</View>
						<View>
							<Text style={styles.greyText}>Full Name</Text>
							<Text style={styles.nameDOB}>{name}</Text>
						</View>
						<View>
							<Text style={styles.greyText}>Date of Birth</Text>
							<Text style={styles.nameDOB}>{birth}</Text>
						</View>
						<View style={styles.ButtonCont}>
							<TouchableOpacity style={styles.editButton} onPress={() => EditProfile()}>
								<Text style={styles.editButtonText}>Edit Profile</Text>
							</TouchableOpacity>
						</View>
					</View>
				) : (
					// -----------EDIT-STYLE--------------------------------------------------------------------
					<View style={styles.containerPart}>
						<View style={styles.containerPart}>
							<Image source={{uri: data.filePath}} style={styles.Image} />
							<View style={styles.viewCameraFile}>
								<TouchableOpacity onPress={() => captureImage('photo')}>
									<Image source={CameraImage} style={styles.cameraIcon} />
								</TouchableOpacity>
								<TouchableOpacity onPress={() => chooseFile('photo')}>
									<Image source={FileImage} style={styles.fileIcon} />
								</TouchableOpacity>
							</View>
						</View>
						<View>
							<Text style={styles.greyText}>Full Name</Text>
							<View style={styles.textInput}>
								<TextInput
									placeholder="Your full name"
									autoCapitalize="none"
									onChangeText={val => nameInputChange(val)}
									onEndEditing={e => handleValidUser(e.nativeEvent.text)}
								/>
								{data.check_nameInputChange ? (
									<Animatable.View animation="bounceIn">
										<Feather name="check-circle" color="green" size={20} />
									</Animatable.View>
								) : null}
							</View>
							{data.isValidUser ? null : (
								<Animatable.View animation="fadeInLeft" duration={500}>
									<Text style={styles.errorMess}>Username must be 4 characters long</Text>
								</Animatable.View>
							)}
						</View>
						<View>
							<Text style={styles.greyText}>Date of Birth</Text>
							<View style={styles.textInput}>
								<TextInput
									placeholder="Input Date of Birth"
									autoCapitalize="none"
									onChangeText={val => handleBirthChange(val)}
								/>
								{data.check_birthInputChange ? (
									<Animatable.View animation="bounceIn">
										<Feather name="check-circle" color="green" size={20} />
									</Animatable.View>
								) : null}
							</View>
							{data.isValidBirth ? null : (
								<Animatable.View animation="fadeInLeft" duration={500}>
									<Text style={styles.errorMess}>Password must be 5 characters long</Text>
								</Animatable.View>
							)}
						</View>
						<View style={styles.viewCancelEdit}>
							<TouchableOpacity style={styles.applyCancelButton} onPress={() => EditProfile()}>
								<Text style={styles.editButtonText}>Cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.applyCancelButton}
								onPress={() => SuccessEdit(data.name, data.DoB, data.filePath)}>
								<Text style={styles.editButtonText}>Edit Profile</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			</ScrollView>
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
			borderBottomColor: 'grey',
			borderBottomWidth: 2,
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingTop: Platform.OS === 'ios' ? 20 : 0,
			paddingBottom: Platform.OS === 'ios' ? 15 : 0,
			marginBottom: Platform.OS === 'ios' ? 15 : 0,
		},
		errorMess: {
			color: theme.colors.primary,
		},
		applyCancelButton: {
			width: 150,
			height: 55,
			alignSelf: 'center',
			borderColor: theme.colors.primary,
			borderRadius: 50,
			backgroundColor: theme.colors.primary,
			justifyContent: 'center',
			alignItems: 'center',
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
	}),
);

export default ProfileScreen;
