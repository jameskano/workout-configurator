import { requireAuth } from '../middleware/authentication';
import {
	getExercise,
	getAllExercises,
	createExercise,
	updateExercise,
	deleteExercise,
	getFilteredExercises,
	getExercisesByIds,
} from '../controllers/exercise-controller';

import express from 'express';

const router = express.Router();

router.use(requireAuth);

router.get('/', getAllExercises);

router.get('/:id', getExercise);

router.post('/ids', getExercisesByIds);

router.post('/', createExercise);

router.post('/filter', getFilteredExercises);

router.put('/', updateExercise);

router.delete('/', deleteExercise);

export default router;
