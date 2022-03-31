import '@testing-library/jest-native/extend-expect';
import {jest} from '@jest/globals';
// eslint-disable-next-line import/no-extraneous-dependencies
import fetch, {Headers, Request, Response} from 'node-fetch';
// eslint-disable-next-line import/no-extraneous-dependencies
import AbortController from 'abort-controller';

import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
	const Reanimated = require('react-native-reanimated/mock');

	// The mock for `call` immediately calls the callback which is incorrect
	// So we override it with a no-op
	Reanimated.default.call = () => {};

	return Reanimated;
});
global.__reanimatedWorkletInit = jest.fn();

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
// import Promise from 'promise-polyfill';

// Setting global.Promise takes care of act warnings that may occur due to 2 waitFor,
// as suggested https://github.com/callstack/react-native-testing-library/issues/379
// global.Promise = Promise;

// jest.mock('react-native-gesture-handler', () => {
// 	return {
// 		Swipeable: View,
// 		DrawerLayout: View,
// 		State: {},
// 		ScrollView: View,
// 		Slider: View,
// 		Switch: View,
// 		TextInput: View,
// 		ToolbarAndroid: View,
// 		ViewPagerAndroid: View,
// 		DrawerLayoutAndroid: View,
// 		WebView: View,
// 		NativeViewGestureHandler: View,
// 		TapGestureHandler: View,
// 		FlingGestureHandler: View,
// 		ForceTouchGestureHandler: View,
// 		LongPressGestureHandler: View,
// 		PanGestureHandler: View,
// 		PinchGestureHandler: View,
// 		RotationGestureHandler: View,
// 		/* Buttons */
// 		RawButton: View,
// 		BaseButton: View,
// 		RectButton: View,
// 		BorderlessButton: View,
// 		/* Other */
// 		FlatList: View,
// 		gestureHandlerRootHOC: () => null,
// 		Directions: {},
// 	};
// });

// suppressing warning resulted by useLinking due to usage of NavigationContainer
jest.mock('@react-navigation/native/lib/commonjs/useLinking.native', () => ({
	default: () => ({getInitialState: {then: () => null}}),
	__esModule: true,
}));
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

// suppressing Animated: `useNativeDriver` is not supported warning
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// beforeEach(() => {
// 	global.fetch = jest.fn((...args) => {
// 		console.warn('global.fetch needs to be mocked in tests', ...args);
// 		throw new Error('global.fetch needs to be mocked in tests');
// 	});
// });

// afterEach(() => {
// 	global.fetch.mockRestore();
// });

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;
global.AbortController = AbortController;

// beforeAll(() => {
// 	mswServer.listen({
// 		onUnhandledRequest(req) {
// 			console.error('Found an unhandled %s request to %s', req.method, req.url.href);
// 		},
// 	});
// });
// afterEach(() => mswServer.resetHandlers());
// afterAll(() => mswServer.close());
