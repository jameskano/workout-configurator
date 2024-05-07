import { createWorkout, updateWorkout } from "../../services/workouts";
import { WorkoutModalTypes } from "./WorkoutModal.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import "./WorkoutModal.scss";
import { ExerciseType } from "../../utils/types/exercise.types";
import { getAllExercisesFn } from "../../pages/exercises/functions/services";
import { useWorkoutContext } from "../../store/context/workout-context/workout-context";

const WorkoutModal = ({ isEditMode, showModal, setShowModal }: WorkoutModalTypes) => {
	const queryClient = useQueryClient();
	const { isLoading, isError, data, error } = useQuery({
		queryKey: ["exercises"],
		queryFn: getAllExercisesFn,
	});
	const {
		workoutItem: { title, favourite, exercises, metadata },
		workoutItem,
		setWorkoutItemDisp,
	} = useWorkoutContext();

	const closeModalHandler = () => {
		setShowModal(false);
		setWorkoutItemDisp();
	};

	const saveWorkoutHandler = async () => {
		try {
			isEditMode ? await updateWorkout(workoutItem) : await createWorkout(workoutItem);
			queryClient.invalidateQueries({ queryKey: ["workouts"] });
		} catch (error) {
			// Error handling
		} finally {
			closeModalHandler();
		}
	};

	const changeFieldHandler = (value: string | boolean, name: string) => {
		const updateExerciseItem = { ...workoutItem, [name]: value };
		setWorkoutItemDisp(updateExerciseItem);
	};

	const changeExerciseSelectionHandler = (value: boolean, exerciseId: string) => {
		let exercisesUpdated: string[] = [];

		if (value) exercisesUpdated = [...workoutItem.exercises, exerciseId];
		else exercisesUpdated = workoutItem.exercises.filter((exercise) => exercise !== exerciseId);

		setWorkoutItemDisp({ ...workoutItem, exercises: exercisesUpdated });
	};

	return (
		<form className={`exercise-modal ${showModal ? "exercise-modal--open" : ""}`}>
			<div className="workout-modal__header">
				<div onClick={closeModalHandler}>
					<ArrowBack />
				</div>
				<span className="workout-modal__info">{isEditMode ? "Edit " : "Add "} workout</span>
			</div>

			<div className="workout-modal__body">
				<TextField
					label="Workout name"
					type="text"
					variant="outlined"
					className="workout-modal__name workout-modal__input"
					size="small"
					value={title}
					onChange={(e) => changeFieldHandler(e.target.value, "title")}
					required
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={favourite}
							color="info"
							onChange={(e, value) => changeFieldHandler(value, "favourite")}
						/>
					}
					label="Favourite"
				/>
				<div className="workout-modal__exercises">
					<span>Select workout exercises *</span>

					<div>
						{data?.map(({ _id, title }: ExerciseType) => {
							return (
								<FormControlLabel
									key={_id}
									control={
										<Checkbox
											checked={exercises.includes(_id!)}
											onChange={(e, value) =>
												changeExerciseSelectionHandler(value, _id!)
											}
											color="info"
										/>
									}
									label={title}
								/>
							);
						})}
					</div>
				</div>
				<TextField
					className="exercise-modal__metadata exercise-modal__input"
					rows={3}
					multiline
					label="Additional information"
					value={metadata}
					onChange={(e) => changeFieldHandler(e.target.value, "metadata")}
				/>
			</div>
			<div className="exercise-modal__bottom">
				<Button onClick={saveWorkoutHandler} variant="contained">
					Save workout
				</Button>
			</div>
		</form>
	);
};

export default WorkoutModal;
