import {StackNavigationProp} from '@react-navigation/stack';
import * as React from 'react';
import EmptyScreen from '../../../../sharedScreens/EmptyScreen';
import {RootStackParamList} from '../../../../types';

type PaymentsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Payments'>;

interface Props {
	navigation: PaymentsScreenNavigationProp;
}

const PaymentsScreen: React.FC<Props> = props => {
	const navigateBack = () => {
		props.navigation.goBack();
	};
	return <EmptyScreen title="Payments" navigateBack={navigateBack} screenName="Payments Screen" />;
};

export default PaymentsScreen;
