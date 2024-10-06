import { colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
	FlatList,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

interface OptionProps {
	label: string;
	value: string | number;
}

interface SelectProps {
	name: string;
	control: any;
	placeholder?: string;
	error?: string;
	options: OptionProps[];
}

export default function Select({
	control,
	name,
	placeholder,
	error,
	options,
}: SelectProps) {
	const [isModalVisible, setIsModalVisible] = useState(false);
	return (
		<View style={styles.container}>
			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, onBlur, value } }) => (
					<>
						<TouchableOpacity
							style={styles.select}
							onPress={() => setIsModalVisible(true)}
						>
							<Text>
								{value
									? options.find((option) => option.value === value)?.label
									: placeholder}
							</Text>
							<Feather name="chevron-down" size={24} color="black" />
						</TouchableOpacity>

						<Modal
							visible={isModalVisible}
							animationType="fade"
							transparent={true}
							onRequestClose={() => {}}
						>
							<TouchableOpacity
								style={styles.modalContainer}
								activeOpacity={1}
								onPress={() => setIsModalVisible(false)}
							>
								<TouchableOpacity style={styles.modalContent} activeOpacity={1}>
									<FlatList
										contentContainerStyle={{ gap: 4 }}
										data={options}
										keyExtractor={(item) => item.value.toString()}
										renderItem={({ item }) => (
											<TouchableOpacity
												style={styles.option}
												onPress={() => {
													onChange(item.value);
													setIsModalVisible(false);
												}}
											>
												<Text>{item.label}</Text>
											</TouchableOpacity>
										)}
									/>
								</TouchableOpacity>
							</TouchableOpacity>
						</Modal>
					</>
				)}
			/>

			{error && <Text style={styles.errorText}>{error}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 16,
	},
	input: {
		backgroundColor: colors.white,
		height: 54,
		borderRadius: 52,
		paddingHorizontal: 10,
	},
	errorText: {
		color: "red",
		marginTop: 4,
	},
	select: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: colors.white,
		height: 54,
		borderRadius: 52,
		paddingHorizontal: 16,
	},
	modalContainer: {
		backgroundColor: "rgba(0,0,0,0.5)",
		flex: 1,
		justifyContent: "center",
	},
	modalContent: {
		backgroundColor: colors.white,
		marginHorizontal: 10,
		borderRadius: 8,
		padding: 20,
	},
	option: {
		paddingVertical: 14,
		backgroundColor: "rgba(208,208,208,0.40)",
		borderRadius: 50,
		paddingHorizontal: 16,
	},
});
