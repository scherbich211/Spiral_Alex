import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { ListOfJul10, ListOfJul11 } from './Lists';
import styles from './style';

  interface Date {
		date: string;
  }
  const data1: Array<Date> = [
    {
      date: 'Jul 11',
    },
    {
      date: 'Jul 10',
    },
  ];

const Checking: React.FunctionComponent = (): JSX.Element => {

  const renderItem = ({ item }: {item: Date}): JSX.Element => (
		<View style={styles.viewItem}>
			<View>
				<Text style={styles.textItem}> {item.date}</Text>
				{item.date == 'Jul 11' ? <ListOfJul11 /> : <ListOfJul10 />}
			</View>
		</View>
	);
	return (
		<View>
			<FlatList
				data={data1}
				keyExtractor={(item: Date, index: number): string => index.toString()}
        renderItem={renderItem}
				ListHeaderComponent={
					<View style={{ paddingTop: 30 }}>
						<View>
							<Text style={styles.moneyBig}>
								$1,500
								<Text style={styles.moneyLittle}>.20</Text>
							</Text>
							<Text style={styles.totalAvailableCash}>Total Available Cash</Text>
						</View>
						<View style={styles.listHeader}>
							<TextInput
								placeholder="Search transactions"
								autoCapitalize="none"
								style={styles.inputButton}
								placeholderTextColor="grey"
							/>
							<TouchableOpacity
								style={styles.buttonFilter}>
								<Text style={styles.littleGreyText}>Filter by</Text>
							</TouchableOpacity>
						</View>
					</View>
				}
			/>
		</View>
	);
};

export default Checking;
