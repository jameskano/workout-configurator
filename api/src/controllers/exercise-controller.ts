import { RequestHandler } from "express";
import ExerciseModel, { ExerciseType } from "../models/exercise-model";
import mongoose from "mongoose";
import { CustomError } from "../utils/classes/errors";

export const getAllExercises: RequestHandler = async (req, res, next) => {
    try {
        const exercises = await ExerciseModel.find({}).sort({ updatedAt: -1 });
        res.status(200).json(exercises);
    } catch (error) {
        next(error);
    }
};

export const getExercise: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    try {
        if (!mongoose.isValidObjectId(id))
            throw new CustomError(400, "Exercise id invalid");

        const exercise = await ExerciseModel.findById(id);

        if (!exercise) throw new CustomError(400, "Exercise does not exist");

        res.status(200).json(exercise);
    } catch (error) {
        next(error);
    }
};

export const createExercise: RequestHandler = async (req, res, next) => {
    const { title, sets, reps, RPE, bodyPart, metadata }: ExerciseType =
        req.body;

    try {
        const newExercise = await ExerciseModel.create({
            title,
            sets,
            reps,
            RPE,
            bodyPart,
            metadata,
        });
        res.status(201).json(newExercise);
    } catch (error) {
        next(error);
    }
};

export const deleteExercise: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    try {
        if (!mongoose.isValidObjectId(id))
            throw new CustomError(400, "Exercise id invalid");

        const deletedExercise = await ExerciseModel.findByIdAndDelete({ id });

        if (!deletedExercise)
            throw new CustomError(400, "Exercise does not exist");

        res.status(204);
    } catch (error) {
        next(error);
    }
};

export const updateExercise: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    try {
        if (!mongoose.isValidObjectId(id))
            throw new CustomError(400, "Exercise id invalid");

        const updatedExercise = await ExerciseModel.findByIdAndUpdate(
            { id },
            { ...req.body }
        );

        if (!updatedExercise)
            throw new CustomError(400, "Exercise does not exist");

        res.status(200).json(updatedExercise);
    } catch (error) {
        next(error);
    }
};
