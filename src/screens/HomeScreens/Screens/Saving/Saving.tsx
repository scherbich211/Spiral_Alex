import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { ListData } from './List';
import styles from './styles';

interface Data {
		data: string;
}
const data: Array<Data>= [{ data: 'some data' }]


const Saving: React.FunctionComponent = (): JSX.Element => {

  const renderItem = ({ item }: {item: Data}) => (
    <View>
      <ListData />
    </View>
  )

  return (
		<View>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={(item, index): string => index.toString()}
				ListHeaderComponent={
					<View>
						<View style={styles.headerBackground}>
							<View>
								<Text style={styles.moneyBig}>
									$5,000
									<Text style={styles.moneyLittle}>.20</Text>
								</Text>
								<Text style={styles.totalAvailableCash}>Total Available Cash</Text>
							</View>
							<View style={styles.imageContainer}>
								<Image source={require('../../../../../assets/Image/email.png')} style={styles.styleImage} />
							</View>
						</View>
						<View style={styles.viewInterestGoodness}>
							<View style={{ ...styles.viewInterestGoodnessView, marginBottom: 10 }}>
								<Text style={styles.viewInterestGoodnessText}>Total interest gained</Text>
								<Text style={styles.viewInterestGoodnessAmount}>+$50.00</Text>
							</View>
							<View style={styles.viewInterestGoodnessView}>
								<Text style={styles.viewInterestGoodnessText}>Goodness points Gained</Text>
								<Text style={styles.viewInterestGoodnessAmount}>+$600</Text>
							</View>
						</View>
						<View style={styles.listHeader}>
							<TextInput
								placeholder="Search transactions"
								autoCapitalize="none"
								style={styles.inputButton}
								placeholderTextColor="grey"
							/>
							<TouchableOpacity style={styles.buttonFilter}>
								<Text style={styles.littleGreyText}>Filter by</Text>
							</TouchableOpacity>
						</View>
					</View>
				}
			/>
		</View>
	);
};

export default Saving
