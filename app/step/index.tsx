import Header from "@/components/header";
import Input from "@/components/input";
import { colors } from "@/constants/Colors";
import { useDataStore } from "@/store/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { z } from "zod";

const schema = z.object({
	name: z.string().min(1, { message: "Nome é obrigatório" }),

	weight: z.string().min(1, { message: "Peso é obrigatório" }),
	age: z.string().min(1, { message: "Idade é obrigatória" }),
	height: z.string().min(1, { message: "Altura é obrigatória" }),
});

type FormData = z.infer<typeof schema>;

export default function Step() {
	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const setPageOne = useDataStore((state) => state.setPageOne);

	const handleCreate = (data: FormData) => {
		console.log("enviando dados para o store da página 1");
		setPageOne({
			name: data.name,
			weight: data.weight,
			height: data.height,
			age: data.age,
		});

		router.push("/create");
	};

	return (
		<View style={styles.container}>
			<Header title="Vamos começar" step="Passo 1" />

			<ScrollView style={styles.content}>
				{/* Nome */}
				<Text style={styles.label}>Nome:</Text>
				<Input
					control={control}
					name="name"
					placeholder="Digite seu nome"
					rules={{ required: true }}
					error={errors.name?.message}
					keyBoardTypes="default"
				/>

				{/* Peso */}
				<Text style={styles.label}>Seu peso:</Text>
				<Input
					control={control}
					name="weight"
					placeholder="EX: 70.5"
					rules={{ required: true }}
					error={errors.name?.message}
					keyBoardTypes="numeric"
				/>

				{/* Altura */}
				<Text style={styles.label}>Sua altura:</Text>
				<Input
					control={control}
					name="height"
					placeholder="EX: 1.70"
					rules={{ required: true }}
					error={errors.name?.message}
					keyBoardTypes="numeric"
				/>

				{/* Idade */}
				<Text style={styles.label}>Sua idade:</Text>
				<Input
					control={control}
					name="age"
					placeholder="EX: 20"
					rules={{ required: true }}
					error={errors.name?.message}
					keyBoardTypes="numeric"
				/>

				<Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
					<Text style={styles.buttonText}>Avançar</Text>
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
		height: 54,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 52,
		marginTop: 34,
	},
	buttonText: {
		fontSize: 16,
		color: colors.white,
		fontWeight: "bold",
	},
});
