import * as React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
// import styles from '../Home/style/style';
import {RootStackParamList} from '../../../../types';
import EmptyScreen from '../../../../sharedScreens/EmptyScreen';

type CardsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Goodness'>;

interface Props {
	navigation: CardsScreenNavigationProp;
}

const GoodnessScreen: React.FC<Props> = props => {
	const navigateBack = () => {
		props.navigation.goBack();
	};
	return <EmptyScreen title="Goodness" navigateBack={navigateBack} screenName="Goodness Screen" />;
};

export default GoodnessScreen;
