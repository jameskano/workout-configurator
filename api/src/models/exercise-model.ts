import { Schema, model, InferSchemaType } from 'mongoose';

const exerciseSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		metadata: {
			type: String,
			required: false,
		},
		sets: {
			type: Number,
			required: true,
		},
		reps: {
			type: Number,
			required: true,
		},
		RPE: {
			type: Number,
			required: true,
		},
		bodyPart: {
			type: String,
			enum: ['chest', 'legs', 'shoulders', 'arms', 'back'],
			required: true,
		},
		userId: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

export type ExerciseType = InferSchemaType<typeof exerciseSchema>;

export default model<ExerciseType>('Exercise', exerciseSchema);
