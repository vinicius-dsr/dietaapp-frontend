import { useDataStore } from "@/store/data";
import React from "react";
import { Text, View } from "react-native";

export default function Nutrition() {
	const user = useDataStore((state) => state.user);
	console.log(user);
	return (
		<View>
			<Text>Nutrition</Text>
		</View>
	);
}
