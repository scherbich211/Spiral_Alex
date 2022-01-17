import React from 'react';
import {StatusBar, StyleSheet, View, ViewStyle} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import TabHeader from '../components/Header/TabHeader';
import Typography from '../components/Typography';
import {SIZES} from '../theme';

export interface IEmptyStyles {
	tapBar: ViewStyle;
	headerText: ViewStyle;
	mainPart: ViewStyle;
}

interface IProps {
	navigateBack: () => void;
	title: string;
	screenName: string;
}

const EmptyScreen: React.FC<IProps> = props => {
	const theme = useTheme();
	const {title} = props;
	const styles = useStyles(title);

	return (
		<View style={styles.tapBar}>
			<StatusBar barStyle="dark-content" />
			<TabHeader
				beforeText={
					<View>
						<Icon.Button
							name="arrow-back"
							size={25}
							backgroundColor={theme.colors.primary}
							onPress={() => props.navigateBack()}
						/>
					</View>
				}
				headerText={props.title}
				headerStyle={styles.headerText}
			/>
			<KeyboardAwareScrollView>
				<View style={styles.mainPart}>
					<Typography>{props.screenName}</Typography>
				</View>
			</KeyboardAwareScrollView>
		</View>
	);
};

const useStyles = StyleSheet.create(
	(title: string): IEmptyStyles => ({
		tapBar: {
			flex: 1,
		},
		headerText: {
			marginLeft: title.length > 6 ? SIZES.width * 0.25 : SIZES.width * 0.3,
		},
		mainPart: {flex: 1, justifyContent: 'center', alignItems: 'center', height: SIZES.height * 0.8},
	}),
);

export default EmptyScreen;
