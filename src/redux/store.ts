import {combineReducers, configureStore, Middleware} from '@reduxjs/toolkit';
import {persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import {user, profile, database} from './reducers';

const persistConfig = {
	key: 'root',
	version: 1,
	storage: AsyncStorage,
	whitelist: ['user', 'profile', 'database'],
};

const reducer = combineReducers({
	user,
	profile,
	database,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const middlewares: Middleware[] = [];

const store = configureStore({
	reducer: persistedReducer,
	middleware: gDM =>
		gDM({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(middlewares),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself

export default store;
