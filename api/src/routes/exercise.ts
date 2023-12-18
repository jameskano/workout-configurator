import {
    getExercise,
    getAllExercises,
    createExercise,
    updateExercise,
    deleteExercise,
} from "../controllers/exercise-controller";

import express from "express";

const router = express.Router();

router.get("/", getAllExercises);

router.get("/:id", getExercise);

router.post("/", createExercise);

router.put("/", updateExercise);

router.delete("/", deleteExercise);

export default router;
