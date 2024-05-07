import {
	createWorkout,
	deleteWorkout,
	getAllWorkouts,
	updateWorkout,
} from "../controllers/workout-controller";
import express from "express";

const router = express.Router();

router.get("/", getAllWorkouts);

router.post("/", createWorkout);

router.put("/", updateWorkout);

router.delete("/", deleteWorkout);

export default router;
