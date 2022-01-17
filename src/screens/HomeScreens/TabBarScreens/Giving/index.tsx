import * as React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
// import styles from '../Home/style/style';
import {RootStackParamList} from '../../../../types';
import EmptyScreen from '../../../../sharedScreens/EmptyScreen';

type GivingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Giving'>;

interface Props {
	navigation: GivingScreenNavigationProp;
}

const GivingScreen: React.FC<Props> = props => {
	const navigateBack = () => {
		props.navigation.goBack();
	};
	return <EmptyScreen title="Giving" navigateBack={navigateBack} screenName="Giving Screen" />;
};

export default GivingScreen;
