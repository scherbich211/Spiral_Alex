import React, {useState, useEffect} from 'react';
import {View, Image, TouchableOpacity, StatusBar, Text, FlatList} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

// import Video from 'react-native-video';
import UserAvatar from '../../UserAvatar/index';

import styles from './style/style';

import {ListOf} from './List';

import {
	ButtonShare,
	DateNow,
	HeaderPartsContainer,
	ImageChildren,
	ImpactText,
	TotalAvailableCash,
} from './ComponentsForHome';

const HomeScreen = ({navigation}) => {
	// --------------------------------------------------------------
	const data = [
		{
			data: 'someData',
		},
	];

	const renderItem = ({item}) => (
		<View style={{flex: 1}}>
			<StatusBar backgroundColor="#C81A7C" />
			<View style={styles.container}>
				<View style={styles.partsContainer}>
					<TotalAvailableCash navigateCards={navigateCards} />
					<View style={{marginTop: 10}}>
						<ListOf cardsScreens={navigate} />
					</View>
				</View>
				<View style={styles.partsContainer}>
					<HeaderPartsContainer />
					<ImageChildren />
					<ImpactText />
					<ButtonShare />
				</View>
				<View style={styles.partsContainer}>
					<TouchableOpacity
						onPress={() => {
							navigateVideo();
						}}>
						<HeaderPartsContainer />
						<View style={styles.ImageOrVideoPartsContainer}>
							{/* <Video source={videoURL} style={styles.videoNormal} muted={videoProps.music} paused={videoProps.paused} /> */}
							<View>
								<View style={styles.buttonMusic}>
									<Icon.Button
										name={videoProps.iconMusic}
										size={25}
										color="white"
										backgroundColor="transparent"
										onPress={MusicVolume}
									/>
								</View>
							</View>
						</View>
						<ImpactText />
						<ButtonShare />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
	return (
		<View style={styles.screenView}>
			<FlatList
				data={data}
				keyExtractor={(item, index) => index.toString()}
				renderItem={renderItem}
				ListHeaderComponent={<DateNow />}
				ListHeaderComponentStyle={{margin: 10}}
			/>
		</View>
	);
};

const HomeStack = createStackNavigator();

const HomeStackScreen = ({navigation}) => {
	const navig = () => {
		navigation.navigate('Profile');
	};
	return (
		<HomeStack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: '#C81A7C',
				},
			}}>
			<HomeStack.Screen
				name="Home"
				component={HomeScreen}
				options={{
					headerLeft: () => (
						<View>
							<Icon.Button
								name="ios-menu"
								size={25}
								backgroundColor="#C81A7C"
								onPress={() => navigation.openDrawer()}
							/>
						</View>
					),
					headerTitle: () => (
						<View style={styles.topBar}>
							<Image source={require('../../../../../assets/Image/email.png')} style={styles.topBarImage} />
							<Text style={styles.topBarText}>Spiral</Text>
						</View>
					),
					headerRight: () => (
						<View style={{marginRight: 10}}>
							<UserAvatar navig={navig} able={true} />
						</View>
					),
				}}
			/>
		</HomeStack.Navigator>
	);
};

export default HomeStackScreen;
