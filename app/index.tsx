import { colors } from "@/constants/colors";
import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
	return (
		<View style={styles.container}>
			<Image
				source={require("../assets/images/logo.png")}
				style={styles.logo}
			/>
			<Text style={styles.title}>
				Dieta<Text style={{ color: colors.white }}>.AI</Text>
			</Text>

			<Text style={styles.text}>
				Sua dieta personalizada com IA para uma vida mais saudável
			</Text>

			<Link href="/step" asChild>
				<Pressable style={styles.button}>
					<Text style={styles.buttonText}>Gerar dieta</Text>
				</Pressable>
			</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.background,
		paddingLeft: 16,
		paddingRight: 16,
	},
	logo: {
		width: 200,
		height: 200,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: colors.green,
		marginTop: 8,
	},
	text: {
		fontSize: 16,
		color: colors.white,
		width: 300,
		marginTop: 8,
		marginBottom: 8,
		textAlign: "center",
	},
	button: {
		backgroundColor: colors.blue,
		width: "100%",
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 4,
		marginTop: 34,
	},
	buttonText: {
		fontSize: 16,
		color: colors.white,
		fontWeight: "bold",
	},
});
