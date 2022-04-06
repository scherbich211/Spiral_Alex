import Icon from 'react-native-vector-icons/Ionicons';
import React, {useRef} from 'react';
import {Animated, FlatList, StyleSheet, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTheme} from 'react-native-paper';
import TabHeader from '../../../../components/Header/TabHeader';
import {Cards} from './Card';
import WalletCard from './WalletCard';
import {RootStackParamList} from '../../../../types';

type CardsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cards'>;

interface Props {
	navigation: CardsScreenNavigationProp;
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const useLazyRef = <T extends object>(initializer: () => T) => {
	const ref = useRef<T>();
	if (ref.current === undefined) {
		ref.current = initializer();
	}
	return ref.current;
};
const cards = [
	{
		index: 1,
		type: Cards.Card1,
	},
	{
		index: 2,
		type: Cards.Card2,
	},
	{
		index: 3,
		type: Cards.Card3,
	},
	{
		index: 4,
		type: Cards.Card4,
	},
	{
		index: 5,
		type: Cards.Card5,
	},
	{
		index: 7,
		type: Cards.Card6,
	},
];

const Wallet: React.FC<Props> = props => {
	const y = useLazyRef(() => new Animated.Value(0));
	const onScroll = useLazyRef(() =>
		Animated.event(
			[
				{
					nativeEvent: {
						contentOffset: {y},
					},
				},
			],
			{useNativeDriver: true},
		),
	);
	const theme = useTheme();
	return (
		<View style={styles.main}>
			<TabHeader
				beforeText={
					<View>
						<Icon.Button
							name="arrow-back"
							size={25}
							backgroundColor={theme.colors.primary}
							onPress={() => props.navigation.goBack()}
						/>
					</View>
				}
				headerText="Cards"
			/>
			<AnimatedFlatList
				scrollEventThrottle={16}
				bounces={false}
				showsVerticalScrollIndicator={false}
				{...{onScroll}}
				data={cards}
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				renderItem={({index, item: {type}}) => <WalletCard {...{index, y, type}} />}
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				keyExtractor={item => `${item.index}`}
			/>
		</View>
	);
};

export default Wallet;

const styles = StyleSheet.create({
	main: {flex: 1},
});
