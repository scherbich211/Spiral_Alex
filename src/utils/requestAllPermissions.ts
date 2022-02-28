import {
	AndroidPermission,
	check,
	IOSPermission,
	PERMISSIONS,
	request,
	RESULTS,
	WindowsPermission,
} from 'react-native-permissions';

import {Platform} from 'react-native';

interface Camera {
	ios?: string;
	android?: string;
	windows?: string;
	macos?: string;
	web?: string;
}

interface REQUEST_PERMISSION_TYPE {
	[key: string]: Camera;
}

const PLATFORM_CAMERA_PERMISSIONS = {
	ios: PERMISSIONS.IOS.CAMERA,
};

const PLATFORM_PHOTO_PERMISSIONS = {
	ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

const REQUEST_PERMISSION_TYPE: REQUEST_PERMISSION_TYPE = {
	camera: PLATFORM_CAMERA_PERMISSIONS,
	photo: PLATFORM_PHOTO_PERMISSIONS,
};

const PERMISSION_TYPE = {
	camera: 'camera',
	photo: 'photo',
};

class AppPermission {
	checkPermission = async (type: string): Promise<boolean> => {
		console.log('AppPermission checkPermission type', type);
		const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];
		console.log('AppPermission checkPermission permissions', permissions);

		if (!permissions) {
			return true;
		}
		try {
			const result = await check(permissions as AndroidPermission | IOSPermission | WindowsPermission);
			console.log('AppPermission checkPermission result', result);

			if (result === RESULTS.GRANTED) {
				console.log('ENDS');
				return true;
			}
			return this.requestPermission(permissions);
		} catch (error) {
			console.log('AppPermission checkPermission error', error);

			return false;
		}
	};

	requestPermission = async (permissions: string): Promise<boolean> => {
		console.log('AppPermission requestPermission permissions', permissions);
		try {
			const result = await request(permissions as AndroidPermission | IOSPermission | WindowsPermission);
			console.log('AppPermission requestPermission result', result);

			return result === RESULTS.GRANTED;
		} catch (error) {
			console.log('AppPermission requestPermission error', error);

			return false;
		}
	};
}

// const componentDidMount = () => {
// 	Permission.checkPermission(PERMISSION_TYPE.camera);
// };

const Permission = new AppPermission();
export {Permission, PERMISSION_TYPE};
