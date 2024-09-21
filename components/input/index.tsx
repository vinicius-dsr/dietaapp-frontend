import { colors } from "@/constants/colors";
import React from "react";
import { Controller } from "react-hook-form";
import {
	type KeyboardTypeOptions,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";

interface InputProps {
	control: any;
	name: string;
	placeholder?: string;
	rules?: object;
	error?: string;
	keyBoardTypes: KeyboardTypeOptions;
}

export default function Input({
	control,
	name,
	placeholder,
	rules,
	error,
	keyBoardTypes,
}: InputProps) {
	return (
		<View style={styles.container}>
			<Controller
				control={control}
				name={name}
				rules={rules}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						placeholder={placeholder}
						style={styles.input}
						onChangeText={onChange}
						onBlur={onBlur}
						value={value}
						keyboardType={keyBoardTypes}
					/>
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
		height: 50,
		borderRadius: 4,
		paddingHorizontal: 10,
	},
	errorText: {
		color: "red",
		marginTop: 4,
	},
});
