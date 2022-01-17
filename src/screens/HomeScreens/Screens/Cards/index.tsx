import * as React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
// import styles from '../Home/style/style';
import {RootStackParamList} from '../../../../types';
import EmptyScreen from '../../../../sharedScreens/EmptyScreen';

type CardsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cards'>;

interface Props {
	navigation: CardsScreenNavigationProp;
}

const CardsScreen: React.FC<Props> = props => {
	const navigateBack = () => {
		props.navigation.goBack();
	};
	return <EmptyScreen title="Cards" navigateBack={navigateBack} screenName="Cards Screen" />;
};

export default CardsScreen;
