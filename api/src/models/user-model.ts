import { InferSchemaType, Schema, model } from 'mongoose';

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

export type UserType = InferSchemaType<typeof userSchema>;

export default model<UserType>('User', userSchema);
