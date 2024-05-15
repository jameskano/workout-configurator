import {
	getExercise,
	getAllExercises,
	createExercise,
	updateExercise,
	deleteExercise,
	getFilteredExercises,
} from '../controllers/exercise-controller';

import express from 'express';

const router = express.Router();

router.get('/', getAllExercises);

router.get('/:id', getExercise);

router.post('/', createExercise);

router.post('/filter', getFilteredExercises);

router.put('/', updateExercise);

router.delete('/', deleteExercise);

export default router;
