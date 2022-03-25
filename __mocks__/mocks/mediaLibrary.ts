import {Asset} from 'react-native-image-picker';

export type Permissions = {
	status: 'denied' | 'granted';
};

export const MediaLibraryOneElementPhoto: Asset = {
	fileName: 'rn_image_picker_lib_temp_e1d8b8eb-de18-40b4-b8be-aa42ccd598d8.jpg',
	fileSize: 298915,
	height: 1100,
	type: 'image/jpeg',
	uri: 'file:///data/user/0/com.spiral/cache/rn_image_picker_lib_temp_e1d8b8eb-de18-40b4-b8be-aa42ccd598d8.jpg',
	width: 550,
};

export const MediaLibraryOneElementPhotoAndroid: Asset = {
	fileName: 'rn_image_picker_lib_temp_e1d8b8eb-de18-40b4-b8be-aa42ccd598d8.jpg',
	fileSize: 298915,
	height: 1100,
	type: 'image/jpeg',
	uri: 'file:///data/user/0/com.spiral/cache/rn_image_picker_lib_temp_e1d8b8eb-de18-40b4-b8be-aa42ccd598d8.jpg',
	width: 550,
};

const photoDataTen: string[] = [];

for (let i = 0; i < 10; i++) {
	photoDataTen.push(`${i}.${Math.round(Math.random() * 10) % 2 === 1 ? 'png' : 'jpg'}`);
}

export const MediaLibraryTenElementPhoto: Asset[] = [...photoDataTen].map(item => ({
	...MediaLibraryOneElementPhoto,
	fileName: item,
}));

export const MediaLibraryTenElementPhotoAndroid: Asset[] = [...photoDataTen].map(item => ({
	...MediaLibraryOneElementPhotoAndroid,
	fileName: item,
}));

const photoDataFiftyOne: string[] = [];
const videoDataFiftyOne: string[] = [];

for (let i = 0; i < 51; i++) {
	photoDataFiftyOne.push(`${i}.${Math.round(Math.random() * 10) % 2 === 1 ? 'png' : 'jpg'}`);
	videoDataFiftyOne.push(`${i}.${Math.round(Math.random() * 10) % 2 === 1 ? 'mp4' : 'mkv'}`);
}

export const mediaLibraryFiftyOneElementPhoto: Asset[] = [...photoDataFiftyOne].map(item => ({
	...MediaLibraryOneElementPhoto,
	fileName: item,
}));

export const mediaLibraryFiftyOneElementPhotoAndroid: Asset[] = [...photoDataFiftyOne].map(item => ({
	...MediaLibraryOneElementPhotoAndroid,
	fileName: item,
}));

// 31 photo 20 video
export const MediaLibraryFiftyOneElementsMixed: Asset[] = [...[...mediaLibraryFiftyOneElementPhoto].splice(0, 31)];

export const MediaLibraryFiftyOneElementsMixedMore: Asset[] = [...[...mediaLibraryFiftyOneElementPhoto].splice(31, 20)];

export const MediaLibraryFiftyOneElementsMixedAndroid: Asset[] = [
	...[...mediaLibraryFiftyOneElementPhotoAndroid].splice(0, 31),
];

export type MediaLibraryResponse = {
	assets: Asset[];
};

export function createMediaLibraryResponse({assets}: MediaLibraryResponse): MediaLibraryResponse {
	return {
		assets,
	};
}
