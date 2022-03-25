import {MediaLibraryResponse, Permissions} from './mocks/mediaLibrary';

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('@unimodules/core', () => ({
	NativeModulesProxy: {
		ExponentMediaLibrary: {
			MediaType: null,
		},
	},
	EventEmitter: jest.fn(),
}));

jest.mock('react-native-text-input-mask', () => 'TextInput');

jest.mock('react-native-permissions', () => {
	return {
		RNPermissions: () => true,
	};
});

jest.mock('react-native-splash-screen', () => {
	return {
		hide: jest.fn(),
	};
});

jest.mock('redux-persist', () => {
	const real = jest.requireActual('redux-persist');
	return {
		...real,
		persistReducer: jest.fn().mockImplementation((_config, reducers) => reducers),
	};
});

jest.mock('react-native-keyboard-aware-scroll-view', () => {
	const {FlatList, ScrollView} = jest.requireActual('react-native');
	return {KeyboardAwareFlatList: FlatList, KeyboardAwareScrollView: ScrollView};
});

function mockFunctions() {
	let mockFiles: MediaLibraryResponse | undefined;
	let mockGetPermissions: Permissions = {status: 'granted'};
	let mockRequestPermissions = {status: 'granted'};

	const ___setMockFiles = (newMockFiles: MediaLibraryResponse) => {
		mockFiles = newMockFiles;
	};

	const ___setMockGetPermissions = (permissions: Permissions) => {
		mockGetPermissions = permissions;
	};

	const ___setMockRequestPermissions = (permissions: Permissions) => {
		mockRequestPermissions = permissions;
	};

	const ___resetMocks = () => {
		mockFiles = undefined;
		mockGetPermissions = {status: 'granted'};
		mockRequestPermissions = {status: 'granted'};
	};

	const getAssetsAsync = ({
		mediaType = 'photo',
		first = 1,
	}: {
		mediaType: 'photo';
		first: number;
	}): MediaLibraryResponse | undefined => {
		if (mockFiles) {
			const mockAssets = mockFiles.assets.filter(() => mediaType === 'photo').splice(0, first);

			return {
				...mockFiles,
				assets: mockAssets,
			};
		}
		return mockFiles;
	};

	const original = jest.requireActual('react-native-image-picker');
	return {
		...original, // Pass down all the exported objects
		___setMockFiles,
		___setMockGetPermissions,
		___setMockRequestPermissions,
		___resetMocks,
		getAssetsAsync,
		MediaType: null,
		PermissionStatus: {
			DENIED: 'denied',
			GRANTED: 'granted',
		},
		getPermissionsAsync: jest.fn(() => mockGetPermissions),
		requestPermissionsAsync: jest.fn(() => mockRequestPermissions),
	};
}

jest.mock('react-native-image-picker', () => mockFunctions());

// eslint-disable-next-line global-require
jest.mock('react-native-permissions', () => require('react-native-permissions/mock'));
