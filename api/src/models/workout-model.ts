import { InferSchemaType, Schema, model } from "mongoose";

const workoutSchema = new Schema(
    {
        title: {
            type: String,
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
    }
);

type Workout = InferSchemaType<typeof workoutSchema>;

export default model<Workout>("Workout", workoutSchema);
