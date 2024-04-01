import Modal from "@mui/material/Modal";
import { ExerciseModalTypes } from "./ExerciseModal.types";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import "./ExerciseModal.scss";
import { bodyParts } from "../../utils/constants/app-constants";
import { useExerciseContext } from "../../store/context/exercise-context/exercise-context";
import { createExercise, updateExercise } from "../../services/exercises";
import CloseIcon from "@mui/icons-material/Close";
import { useQueryClient } from "@tanstack/react-query";
import { bodyPartToLowerCase } from "../../utils/functions/format-body-part-value";

const ExerciseModal = ({ showModal, setShowModal, isEditMode }: ExerciseModalTypes) => {
	const {
		exerciseItem: { _id, title, sets, reps, RPE, metadata, bodyPart },
		exerciseItem,
		setExerciseItemDisp,
	} = useExerciseContext();
	const queryClient = useQueryClient();

	const closeModalHandler = () => {
		setShowModal(false);
		setExerciseItemDisp();
	};

	const changeFieldHandler = (value: string | number | null, name: string) => {
		const formattedValue = bodyPartToLowerCase(value, name);
		const updateExerciseItem = { ...exerciseItem, [name]: formattedValue };
		setExerciseItemDisp(updateExerciseItem);
	};

	const saveExerciseHandler = async () => {
		try {
			isEditMode ? await updateExercise(exerciseItem) : await createExercise(exerciseItem);
			queryClient.invalidateQueries({ queryKey: ["exercises"] });
		} catch (error) {
			// Error handling
		} finally {
			closeModalHandler();
		}
	};

	return (
		<Modal
			open={showModal}
			onClose={closeModalHandler}
			className="exercise-modal"
			disablePortal>
			<Box component="form" className="exercise-modal__form">
				<div className="exercise-modal__header">
					<span className="exercise-modal__info">
						{isEditMode ? "Edit " : "Add "} exercise
					</span>
					<div onClick={closeModalHandler}>
						<CloseIcon />
					</div>
				</div>
				<div className="exercise-modal__body">
					<TextField
						label="Exercise title"
						type="text"
						variant="outlined"
						className="exercise-modal__title exercise-modal__input"
						size="small"
						value={title}
						onChange={(e) => changeFieldHandler(e.target.value, "title")}
					/>
					<Autocomplete
						disablePortal
						value={bodyPart}
						options={Object.values(bodyParts)}
						onChange={(e, value) => changeFieldHandler(value, "bodyPart")}
						renderInput={(params) => <TextField {...params} label="Body part" />}
						className="exercise-modal__option exercise-modal__input"
						size="small"
					/>
					<TextField
						label="Reps"
						type="number"
						variant="outlined"
						className="exercise-modal__option exercise-modal__input"
						size="small"
						value={reps}
						onChange={(e) => changeFieldHandler(e.target.value, "reps")}
					/>
					<TextField
						label="Sets"
						type="number"
						variant="outlined"
						className="exercise-modal__option exercise-modal__input"
						size="small"
						value={sets}
						onChange={(e) => changeFieldHandler(e.target.value, "sets")}
					/>
					<TextField
						label="RPE"
						type="number"
						variant="outlined"
						className="exercise-modal__option exercise-modal__input"
						size="small"
						fullWidth={false}
						value={RPE}
						onChange={(e) => changeFieldHandler(e.target.value, "RPE")}
					/>
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
					<Button onClick={saveExerciseHandler} variant="contained">
						Save exercise
					</Button>
				</div>
			</Box>
		</Modal>
	);
};

export default ExerciseModal;
