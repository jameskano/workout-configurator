import { useMemo, useState } from "react";
import { ExerciseType } from "utils/types/exercise.types";
import { ExerciseContext } from "./exercise-context";

export const ExerciseProvider = ({ children }: { children: React.ReactNode }) => {
	const [exerciseItem, setExerciseItem] = useState<ExerciseType>({
		title: "",
		sets: 0,
		reps: 0,
		RPE: 0,
		metadata: "",
		bodyPart: "",
		_id: undefined,
	});
	const [exerciseList, setExerciseList] = useState<ExerciseType[]>([]);

	const setExerciseItemDisp = (value?: ExerciseType) => {
		if (value) setExerciseItem(value);
		else
			setExerciseItem({
				title: "",
				sets: 0,
				reps: 0,
				RPE: 0,
				bodyPart: "",
				metadata: "",
				_id: undefined,
			});
	};

	const setExerciseListDisp = (value: ExerciseType[]) => setExerciseList(value);

	const value = useMemo(
		() => ({
			exerciseItem,
			exerciseList,
			setExerciseListDisp,
			setExerciseItemDisp,
		}),
		[exerciseItem, exerciseList],
	);

	return <ExerciseContext.Provider value={value}>{children}</ExerciseContext.Provider>;
};
