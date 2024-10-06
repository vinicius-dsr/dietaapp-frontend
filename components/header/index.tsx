import { colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import {
	Platform,
	Pressable,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from "react-native";

interface HeaderProps {
	step: string;
	title: string;
}

export default function Header({ title, step }: HeaderProps) {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<View style={styles.row}>
					<Pressable onPress={() => router.back()}>
						<Feather name="arrow-left" size={24} color="#000" />
					</Pressable>
					<Text style={styles.text}>
						{step} <Feather name="loader" size={16} color="#000" />
					</Text>
				</View>

				<Text style={styles.title}>{title}</Text>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		borderBottomRightRadius: 52,
		marginBottom: 14,
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight! + 34 : 34,
	},
	content: {
		paddingLeft: 16,
		paddingRight: 16,
		paddingBottom: 34,
		borderBottomRightRadius: 52,
	},
	row: {
		flexDirection: "row",
		gap: 8,
		alignItems: "center",
	},
	text: {
		fontSize: 18,
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		color: colors.background,
	},
});
