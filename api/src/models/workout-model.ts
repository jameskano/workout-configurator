import { InferSchemaType, Schema, model } from "mongoose";

const workoutSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		favourite: {
			type: Boolean,
			required: true,
		},
		exercises: {
			type: Array<Number>,
			required: true,
		},
		metadata: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	},
);

export type WorkoutType = InferSchemaType<typeof workoutSchema>;

export default model<WorkoutType>("Workout", workoutSchema);
