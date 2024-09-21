import Header from "@/components/header";
import Select from "@/components/input/select";
import { colors } from "@/constants/colors";
import { useDataStore } from "@/store/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { z } from "zod";

const schema = z.object({
	gender: z.string().min(1, { message: "Selecione um gênero" }),
	objective: z.string().min(1, { message: "Selecione um objetivo" }),
	level: z.string().min(1, { message: "Selecione um nível" }),
});

type FormData = z.infer<typeof schema>;

export default function Create() {
	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const setPageTwo = useDataStore((state) => state.setPageTwo);

	const genderOptions = [
		{ label: "Masculino", value: "masculino" },
		{ label: "Feminino", value: "feminino" },
	];

	const levelOptions = [
		{ label: "Sedentário (pouco ou nenhum exercício)", value: "Sedentario" },
		{
			label: "Levemente ativo (exercício leve 1 a 3 dias por semana)",
			value: "Levemente ativo (exercício leve 1 a 3 dias por semana)",
		},
		{
			label: "Moderadamente ativo (exercício moderado 3 a 5 dias por semana)",
			value: "Moderadamente ativo (exercício moderado 3 a 5 dias por semana)",
		},
		{
			label: "Altamente ativo (exercício intenso 6 a 7 dias por semana)",
			value: "Altamente ativo (exercício intenso 6 a 7 dias por semana)",
		},
	];

	const objectiveOptions = [
		{ label: "Emagrecer", value: "emagrecer" },
		{ label: "Hipertrofia", value: "hipertrofia" },
		{ label: "Hipertrofia + Definição", value: "hipertrofia e definição" },
		{ label: "Definição", value: "definição" },
	];

	function handleCreate(data: FormData) {
		setPageTwo({
			gender: data.gender,
			objective: data.objective,
			level: data.level,
		});
		router.push("/nutrition");
	}

	return (
		<View style={styles.container}>
			<Header step="Passo 2" title="Finalizando dieta" />
			<ScrollView style={styles.content}>
				{/* Gênero */}
				<Text style={styles.label}>Gênero:</Text>
				<Select
					placeholder="Selecione um gênero"
					name="gender"
					control={control}
					options={genderOptions}
					error={errors.gender?.message}
				/>

				{/* Nível */}
				<Text style={styles.label}>Nível de atividades físicas:</Text>
				<Select
					placeholder="Selecione um nível"
					name="level"
					control={control}
					options={levelOptions}
					error={errors.level?.message}
				/>

				{/* Objetivo */}
				<Text style={styles.label}>Objetivo:</Text>
				<Select
					placeholder="Selecione um objetivo"
					name="objective"
					control={control}
					options={objectiveOptions}
					error={errors.objective?.message}
				/>

				<Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
					<Text style={styles.buttonText}>Gerar dieta</Text>
				</Pressable>
			</ScrollView>
		</View>
	);
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
