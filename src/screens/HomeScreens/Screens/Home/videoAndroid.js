import React, { useState } from 'react';

import { Text, View, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from './style/style';

import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';

function VideoScreen({ navigation, paused }) {
	const videoURL = require('../../Assets/video.mp4');
	const [videoPropsAndroid, setVideoPropsAndroid] = useState(false);
	return (
		<View style={styles.viewVideoAndroid}>
			<StatusBar backgroundColor="black" />
			<Icon.Button
				name="arrow-back-outline"
				size={25}
				backgroundColor="black"
				onPress={() => {
					navigation.navigate('Home'), setVideoPropsAndroid(true);
				}}
			/>
			<Video source={videoURL} controls={true} style={styles.videoAndroid} paused={videoPropsAndroid} />
		</View>
	);
}

const VideoStack = createStackNavigator();

function VideoStackScreen({ navigation }) {
	return (
		<VideoStack.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			<VideoStack.Screen name="Video" component={VideoScreen} />
		</VideoStack.Navigator>
	);
}

export default VideoStackScreen;
