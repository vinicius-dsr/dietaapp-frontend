import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { colors } from '@/constants/colors';
import Header from '@/components/header';

export default function Create() {
  return (
    <View style={styles.container}>
      <Header step="Passo 2" title="Finalizando dieta"/>
    </View>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,

	},
	content: {
		paddingHorizontal: 24,
		marginTop: 24,
	},
	label: {
		fontSize: 16,
		color: colors.white,
		fontWeight: "bold",
		marginBottom: 8,
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