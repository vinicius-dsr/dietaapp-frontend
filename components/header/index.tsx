import { colors } from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
import {
	Platform,
	Pressable,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from "react-native";

export default function Header() {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<View style={styles.row}>
					<Pressable>
						<Feather name="arrow-left" size={24} color="#000" />
					</Pressable>
					<Text style={styles.text}>
						Passo 1 <Feather name="loader" size={16} color="#000" />
					</Text>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		borderBottomRightRadius: 14,
		borderBottomLeftRadius: 14,
		marginBottom: 14,
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight! + 34 : 34,
	},
	content: {
		paddingLeft: 16,
		paddingRight: 16,
		paddingBottom: 34,
		borderBottomRightRadius: 14,
		borderBottomLeftRadius: 14,
	},
	row: {
		flexDirection: "row",
		gap: 8,
		alignItems: "center",
	},
	text: {
		fontSize: 18,
	},
});
