import { requireAuth } from '../middleware/authentication';
import {
	createWorkout,
	deleteWorkout,
	getAllWorkouts,
	updateWorkout,
	getFilteredWorkouts,
} from '../controllers/workout-controller';
import express from 'express';

const router = express.Router();

router.use(requireAuth);

router.get('/', getAllWorkouts);

router.post('/', createWorkout);

router.post('/filter', getFilteredWorkouts);

router.put('/', updateWorkout);

router.delete('/', deleteWorkout);

export default router;
