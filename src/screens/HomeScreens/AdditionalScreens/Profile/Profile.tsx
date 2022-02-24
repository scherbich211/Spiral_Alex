import React, {useContext, useEffect, useState} from 'react';
import {Image, ScrollView, View, Text, TouchableOpacity, TextInput, Alert, Platform, StyleSheet} from 'react-native';
import {ImageLibraryOptions, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {requestCameraPermission, requestExternalWritePermission} from '../../../../utils/componentsForProfile';
import {Permission, PERMISSION_TYPE} from '../../../../utils/AppPermission';
import CameraImage from '../../../../../assets/Image/camera.png';
import FileImage from '../../../../../assets/Image/file.png';
import {RootStackParamList} from '../../../../types';
import TabHeader from '../../../../components/Header/TabHeader';
import {IProfileStyle} from '../../../../types/profile';
import Typography from '../../../../components/Typography';
import {AuthContext} from '../../../../AuthProvider';

interface Data {
	name: string;
	DoB: string;
	edit: boolean;
	filePath: string;
}

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

interface IProps {
	navigation: ProfileScreenNavigationProp;
}

const ProfileScreen: React.FC<IProps> = (props): JSX.Element => {
	const {user} = useContext(AuthContext);
	const theme = useTheme();
	const styles = useStyles(theme);
	const [image, setImage] = useState('');
	const [upload, setUpload] = useState(false);
	const [transfered, setTransfered] = useState(0);
	// ----------everything with input and text-------------------------------------------------------

	const [data, setData] = useState<Data>({
		name: '',
		DoB: '',
		edit: false,
		filePath: '',
	});

	const getUser = async () => {
		setUpload(true);
		await firestore()
			.collection('users')
			.doc(user.uid)
			.get()
			.then(documentSnapshot => {
				if (documentSnapshot.exists) {
					console.log('User Data', documentSnapshot.data());
					setData({
						...data,
						name: documentSnapshot.data().fullName,
						DoB: documentSnapshot.data().userBirth,
						filePath: documentSnapshot.data().userImg,
					});
				}
			});
		setUpload(false);
	};

	const submitPost = async () => {
		const imgUrl = await uploadImage();
		console.log('utl', imgUrl);
		firestore()
			.collection('users')
			.doc(user.uid)
			.update({
				fullName: data.name,
				userBirth: data.DoB,
				userImg: imgUrl,
			})
			.then(() => {
				console.log('User Updated!');
				Alert.alert('Profile Updated!', 'Your profile has been updated successfully.');
			});
	};

	const uploadImage = async () => {
		let fileName = image.substring(image.lastIndexOf('/') + 1);

		const extension = fileName.split('.').pop();
		const nameFile = fileName.split('.').slice(0, -1).join('.');
		fileName = `${nameFile + Date.now()}.${extension}`;

		setUpload(true);
		setTransfered(0);

		const storageRef = storage().ref(`photos/${fileName}`);
		const task = storageRef.putFile(image);

		task.on('state_changed', taskSnapshot => {
			console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);

			setTransfered(Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100);
		});
		try {
			await task;
			const url = await storageRef.getDownloadURL();

			setUpload(false);
			Alert.alert('done');
			return url;
		} catch (error) {
			console.log(error);
			return null;
		}
	};

	const EditProfile = (): void => {
		if (data.edit === false) {
			setData({
				...data,
				edit: true,
			});
		} else if (data.edit === true) {
			setData({
				...data,
				edit: false,
			});
		}
	};

	useEffect(() => {
		if (!upload) {
			setData({
				...data,
				edit: false,
			});
		}
	}, [upload]);

	const nameInputChange = (val: string): void => {
		if (val.length >= 4) {
			setData({
				...data,
				name: val,
			});
		} else {
			setData({
				...data,
				name: val,
			});
		}
	};
	console.log(data.name);

	const handleBirthChange = (val: string): void => {
		if (val.length >= 4) {
			setData({
				...data,
				DoB: val,
			});
		} else {
			setData({
				...data,
				DoB: val,
			});
		}
	};
	console.log(data.DoB);

	useEffect(() => {
		getUser();
	}, []);

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
							setImage(asset.uri);
							// setData({
							// 	...data,
							// 	filePath: asset.uri,
							// });
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
						{upload ? (
							<View style={styles.containerPart}>
								<Typography>{transfered}</Typography>
								<ActivityIndicator size="large" />
							</View>
						) : (
							<>
								<View>
									<Image
										source={{
											uri: data
												? data.filePath ||
												  'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
												: 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
										}}
										style={styles.Image}
									/>
								</View>
								<View>
									<Text style={styles.greyText}>Full Name</Text>
									<Text style={styles.nameDOB}>{data.name}</Text>
								</View>
								<View>
									<Text style={styles.greyText}>Date of Birth</Text>
									<Text style={styles.nameDOB}>{data.DoB}</Text>
								</View>
							</>
						)}
						<View style={styles.ButtonCont}>
							<TouchableOpacity style={styles.editButton} onPress={() => EditProfile()}>
								<Text style={styles.editButtonText}>Edit Profile</Text>
							</TouchableOpacity>
						</View>
					</View>
				) : (
					// -----------EDIT-STYLE--------------------------------------------------------------------
					<View style={styles.containerPart}>
						{upload ? (
							<View style={styles.containerPart}>
								<Typography>{transfered}</Typography>
								<ActivityIndicator size="large" />
							</View>
						) : (
							<View style={styles.containerPart}>
								<Image
									source={{
										uri:
											image ||
											(data
												? data.filePath ||
												  'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
												: 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'),
									}}
									style={styles.Image}
								/>
								<View style={styles.viewCameraFile}>
									<TouchableOpacity onPress={() => captureImage('photo')}>
										<Image source={CameraImage} style={styles.cameraIcon} />
									</TouchableOpacity>
									<TouchableOpacity onPress={() => chooseFile('photo')}>
										<Image source={FileImage} style={styles.fileIcon} />
									</TouchableOpacity>
								</View>
							</View>
						)}
						<View>
							<Text style={styles.greyText}>Full Name</Text>
							<View style={styles.textInput}>
								<TextInput
									placeholder="Your full name"
									autoCapitalize="none"
									value={data ? data.name : ''}
									onChangeText={val => nameInputChange(val)}
								/>
							</View>
						</View>
						<View>
							<Text style={styles.greyText}>Date of Birth</Text>
							<View style={styles.textInput}>
								<TextInput
									placeholder="Input Date of Birth"
									autoCapitalize="none"
									value={data ? data.DoB : ''}
									onChangeText={val => handleBirthChange(val)}
								/>
							</View>
						</View>
						<View style={styles.viewCancelEdit}>
							<TouchableOpacity style={styles.applyCancelButton} onPress={() => EditProfile()}>
								<Text style={styles.editButtonText}>Cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.applyCancelButton} onPress={submitPost} disabled={upload}>
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
