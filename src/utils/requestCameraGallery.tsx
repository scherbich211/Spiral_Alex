import {Platform} from 'react-native';
import {ImageLibraryOptions, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Permission, PERMISSION_TYPE} from './requestAllPermissions';
import {requestCameraPermission, requestExternalWritePermission} from './requestPermissions';

// -------------takePhoto------------------------------------------------------------
export const captureImage = async (
	type: ImageLibraryOptions['mediaType'],
	changeImage: (url: string) => void,
): Promise<void> => {
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
								changeImage(asset.uri);
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
		}
	}
};

// -------------chooseFile------------------------------------------------------------
export const chooseFile = (type: ImageLibraryOptions['mediaType'], changeImage: (url: string) => void) => {
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
						changeImage(asset.uri);
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
