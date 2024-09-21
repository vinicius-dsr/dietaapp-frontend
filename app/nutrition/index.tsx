import { colors } from "@/constants/colors";
import { api } from "@/services/api";
import { useDataStore } from "@/store/data";
import type { Data } from "@/types/data";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

interface RespondeData {
	data: Data;
}

export default function Nutrition() {
	const user = useDataStore((state) => state.user);

	const { data, isFetching, error } = useQuery({
		queryKey: ["nutrition"],
		queryFn: async () => {
			try {
				if (!user) {
					throw new Error("Failed to fetch nutrition");
				}

				const response = await api.post<RespondeData>("/create", {
					name: user.name,
					age: user.age,
					gender: user.gender,
					height: user.height,
					weight: user.weight,
					objective: user.objective,
					level: user.level,
				});

				console.log(response.data.data);
				return response.data.data;
			} catch (error) {
				console.log(error);
			}
		},
	});

	if (isFetching) {
		return (
			<View style={styles.loading}>
				<Text style={styles.loadingText}>Estamos gerando sua dieta!</Text>
				<Text style={styles.loadingText}>Consultando IA...</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View style={styles.loading}>
				<Text style={styles.loadingText}>Falha em gerar sua dieta!</Text>
				<Text style={styles.loadingText}>Tente novamente mais tarde</Text>
				<Link href="/">
					<Text style={styles.loadingText}>Tente novamente</Text>
				</Link>
			</View>
		);
	}
	return (
		<View style={styles.container}>
			<View style={styles.ContainerHeader}>
				<View style={styles.contentHeader}>
					<Text style={styles.title}>Minha dieta</Text>
					<Pressable style={styles.shareButton}>
						<Text style={styles.shareButtonText}>Compartilhar</Text>
						<Feather name="share-2" size={14} color="white" />
					</Pressable>
				</View>
			</View>

			<View style={{ paddingHorizontal: 16, flex: 1 }}>
				{data && Object.keys(data).length > 0 && (
					<>
						<Text style={styles.name}>Nome: {data.nome}</Text>
						<Text style={styles.objective}>Foco: {data.objetivo}</Text>

						<Text style={styles.label}>Refeição:</Text>
						<ScrollView>
							<View style={styles.foods}>
								{data.refeicoes.map((refeicao) => (
									<View style={styles.food} key={refeicao.nome}>
										<View style={styles.foodHeader}>
											<Text style={styles.foodName}>{refeicao.nome}</Text>

											<Ionicons
												name="restaurant"
												size={16}
												color={colors.black}
											/>
										</View>

										<View style={styles.foodContent}>
											<Feather name="clock" size={16} color={colors.black} />
											<Text>Horário: {refeicao.horario}</Text>
										</View>

										<Text style={styles.foodText}>Alimentos:</Text>
										{refeicao.alimentos.map((alimento) => (
											<Text key={alimento}>{alimento}</Text>
										))}
									</View>
								))}
							</View>

							<View style={styles.suplementos}>
								<Text style={styles.foodName}>Dicas de suplementos:</Text>
								{data.suplementos.map((suplemento) => (
									<Text key={suplemento}>{suplemento}</Text>
								))}
							</View>

							<Pressable
								style={styles.button}
								onPress={() => router.replace("/")}
							>
								<Text style={styles.buttonText}>Gerar nova dieta</Text>
							</Pressable>
						</ScrollView>
					</>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	loading: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.background,
	},
	loadingText: {
		fontSize: 18,
		color: colors.white,
		marginBottom: 4,
	},
	ContainerHeader: {
		backgroundColor: colors.white,
		borderBottomLeftRadius: 14,
		borderBottomRightRadius: 14,
		paddingTop: 60,
		paddingBottom: 20,
		marginBottom: 16,
	},
	contentHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
	},
	shareButton: {
		backgroundColor: colors.blue,
		padding: 8,
		paddingHorizontal: 12,
		gap: 8,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
	},
	shareButtonText: {
		color: colors.white,
		fontWeight: "500",
	},
	name: {
		fontSize: 20,
		color: colors.white,
		fontWeight: "bold",
	},
	objective: {
		fontSize: 16,
		color: colors.white,
		marginBottom: 24,
	},
	label: {
		fontSize: 16,
		color: colors.white,
		fontWeight: "bold",
	},
	foods: {
		backgroundColor: colors.white,
		padding: 16,
		borderRadius: 8,
		marginTop: 8,
		gap: 8,
	},
	food: {
		backgroundColor: "rgba(208, 208, 208, 0.40)",
		padding: 8,
		borderRadius: 8,
		gap: 8,
	},
	foodHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 4,
	},
	foodName: {
		fontSize: 16,
		fontWeight: "bold",
	},
	foodContent: {
		flexDirection: "row",
		gap: 4,
		alignItems: "center",
	},
	foodText: {
		fontSize: 16,
		marginBottom: 4,
		marginTop: 14,
	},
	suplementos: {
		backgroundColor: colors.white,
		padding: 14,
		borderRadius: 8,
		marginTop: 14,
		marginBottom: 14,
		gap: 4,
	},
	button: {
		backgroundColor: colors.blue,
		width: "100%",
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 4,
		marginTop: 14,
		marginBottom: 24,
	},
	buttonText: {
		fontSize: 16,
		color: colors.white,
		fontWeight: "bold",
	},
});
