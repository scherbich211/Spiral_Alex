import React, {useContext, useEffect, useState} from 'react';
import {Image, ScrollView, View, Text, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {ActivityIndicator, useTheme, TextInput} from 'react-native-paper';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import TextInputMask from 'react-native-text-input-mask';
import CameraImage from '../../../../../assets/Image/camera.png';
import FileImage from '../../../../../assets/Image/file.png';
import {RootStackParamList} from '../../../../types';
import TabHeader from '../../../../components/Header/TabHeader';
import {IProfileStyle} from '../../../../types/profile';
import {AuthContext} from '../../../../AuthProvider';
import {captureImage, chooseFile} from '../../../../utils/requestCameraGallery';
import {useAppDispatch, useAppSelector} from '../../../../hooks';
import {changeAvatarRedux, changeProfileInfo} from '../../../../redux/reducers/profile';
import {ButtonsEdit, NormalProfileScreen} from './ProfileComponents';

export interface FormData {
	fullName: string;
	birth: string;
}

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

interface IProps {
	navigation: ProfileScreenNavigationProp;
}

const ProfileScreen: React.FC<IProps> = (props): JSX.Element => {
	const {user} = useContext(AuthContext);
	console.log(user.uid);
	const theme = useTheme();
	const styles = useStyles(theme);
	const dispatch = useAppDispatch();
	const {avatar} = useAppSelector(state => state.profile);
	const [image, setImage] = useState('');
	const [upload, setUpload] = useState(false);
	const [edit, setEdit] = useState<boolean>(false);

	const schema = Yup.object().shape({
		fullName: Yup.string()
			.matches(/[^0-9\s]/g)
			.required(),
		birth: Yup.string().required(),
	});
	const {
		control,
		formState: {errors, isValid},
		getValues,
	} = useForm<FormData>({
		resolver: yupResolver(schema),
		mode: 'onBlur',
	});

	const submitPost = async () => {
		const imgUrl = await uploadImage();
		console.log('utl', imgUrl);
		firestore()
			.collection('users')
			.doc(user.uid)
			.update({
				fullName: getValues('fullName'),
				userBirth: getValues('birth'),
				userImg: imgUrl || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
			})
			.then(() => {
				dispatch(changeProfileInfo({name: getValues('fullName'), birth: getValues('birth')}));
				dispatch(
					changeAvatarRedux(
						imgUrl || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
					),
				);
				console.log('User Updated!');
				Alert.alert('Profile Updated!', 'Your profile has been updated successfully.');
			});
	};

	const uploadImage = async () => {
		if (image) {
			let fileName = image.substring(image.lastIndexOf('/') + 1);

			const extension = fileName.split('.').pop();
			const nameFile = fileName.split('.').slice(0, -1).join('.');
			fileName = `${nameFile + Date.now()}.${extension}`;

			setUpload(true);

			const storageRef = storage().ref(`photos/${fileName}`);
			const task = storageRef.putFile(image);

			task.on('state_changed', taskSnapshot => {
				console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
			});
			try {
				await task;
				const url = await storageRef.getDownloadURL();

				setUpload(false);
				return url;
			} catch (error) {
				console.log(error);
				return null;
			}
		} else {
			return null;
		}
	};

	useEffect(() => {
		const getUser = async () => {
			// setUpload(true);
			await firestore()
				.collection('users')
				.doc(user.uid)
				.get()
				.then(documentSnapshot => {
					if (documentSnapshot.exists) {
						console.log('User Data', documentSnapshot.data());
						dispatch(
							changeProfileInfo({name: documentSnapshot.data()?.fullName, birth: documentSnapshot.data()?.userBirth}),
						);
						dispatch(changeAvatarRedux(documentSnapshot.data()?.userImg));
					}
				});
			setUpload(false);
		};
		getUser();
	}, []);

	const changeImage = (url: string) => {
		setImage(url);
	};

	const editProfile = (): void => {
		setEdit(!edit);
		if (!edit) {
			setImage('');
		}
	};

	useEffect(() => {
		if (!upload) {
			setEdit(edit === false);
			if (edit === true) {
				setImage('');
			}
		}
	}, [upload]);

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
				{edit === false ? (
					// ! Normal-STYLE
					<NormalProfileScreen upload={upload} editProfile={editProfile} />
				) : (
					// ! Edit-STYLE
					<View style={styles.containerPart}>
						{upload ? (
							<View style={styles.containerPart}>
								<ActivityIndicator size="large" />
							</View>
						) : (
							<View style={styles.containerPart}>
								<Image
									source={{
										uri:
											image ||
											(avatar
												? avatar ||
												  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
												: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'),
									}}
									style={styles.Image}
								/>
								<View style={styles.viewCameraFile}>
									<TouchableOpacity onPress={() => captureImage('photo', changeImage)}>
										<Image source={CameraImage} style={styles.cameraIcon} />
									</TouchableOpacity>
									<TouchableOpacity onPress={() => chooseFile('photo', changeImage)}>
										<Image source={FileImage} style={styles.fileIcon} />
									</TouchableOpacity>
								</View>
							</View>
						)}
						<View style={styles.inputsView}>
							<Text style={styles.greyText}>Full Name</Text>
							<View style={styles.textInput}>
								<Controller
									control={control}
									render={({field: {onChange, value, onBlur}}) => (
										<TextInput
											onChangeText={onChange}
											value={value === undefined ? value : value.trimLeft().replace(/\s+/g, ' ')}
											label="Full name*"
											error={Boolean(errors.fullName)}
											style={styles.input}
											onBlur={onBlur}
										/>
									)}
									name="fullName"
								/>
							</View>
						</View>
						<View>
							<Text style={styles.greyText}>Date of Birth</Text>
							<View style={styles.textInput}>
								<Controller
									control={control}
									render={({field: {onChange, value, onBlur}}) => (
										<TextInput
											onChangeText={onChange}
											value={value}
											label="Date of Birth*"
											placeholder="mm/dd/yyyy"
											error={Boolean(errors.birth)}
											style={styles.input}
											onBlur={onBlur}
											render={props => {
												// eslint-disable-next-line @typescript-eslint/ban-ts-comment
												// @ts-ignore
												return <TextInputMask {...props} mask="[00]/[00]/[0000]" />;
											}}
										/>
									)}
									name="birth"
								/>
							</View>
						</View>
						<ButtonsEdit upload={upload} editProfile={editProfile} isValid={isValid} submitPost={submitPost} />
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

export default ProfileScreen;
