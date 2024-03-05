import Modal from "@mui/material/Modal";
import { ExerciseModalTypes } from "./ExerciseModal.types";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import "./ExerciseModal.scss";
import { bodyParts } from "../../utils/constants/app-constants";
import { useExerciseContext } from "../../store/context/exercise-context/exercise-context";

const ExerciseModal = ({
    showModal,
    setShowModal,
    isEditMode,
}: ExerciseModalTypes) => {
    const { exerciseItem, setExerciseItemDisp } = useExerciseContext();

    const setShowModalHandler = () => setShowModal(false);

    const changeFieldHandler = (value: string | number, name: string) => {
        const updateExerciseItem = { ...exerciseItem, [name]: value };
        setExerciseItemDisp(updateExerciseItem);
    };

    return (
        <Modal
            open={showModal}
            onClose={setShowModalHandler}
            className="exercise-modal"
            disablePortal
        >
            <Box component="form" className="exercise-modal__form">
                <div className="exercise-modal__header">
                    <span className="exercise-modal__info">
                        {isEditMode ? "Edit " : "Add "} exercise
                    </span>
                </div>
                <div className="exercise-modal__body">
                    <TextField
                        label="Exercise title"
                        type="text"
                        variant="outlined"
                        className="exercise-modal__title exercise-modal__input"
                        size="small"
                        value={exerciseItem.title}
                        onChange={(e) => console.log(e.target.value)}
                    />
                    <Autocomplete
                        disablePortal
                        value={exerciseItem.bodyPart}
                        options={Object.values(bodyParts)}
                        // onChange={}
                        // onInputChange={}
                        renderInput={(params) => (
                            <TextField {...params} label="Body part" />
                        )}
                        className="exercise-modal__option exercise-modal__input"
                        size="small"
                    />
                    <TextField
                        label="Reps"
                        type="number"
                        variant="outlined"
                        className="exercise-modal__option exercise-modal__input"
                        size="small"
                        value={exerciseItem.reps}
                    />
                    <TextField
                        label="Sets"
                        type="number"
                        variant="outlined"
                        className="exercise-modal__option exercise-modal__input"
                        size="small"
                        value={exerciseItem.sets}
                    />
                    <TextField
                        label="RPE"
                        type="number"
                        variant="outlined"
                        className="exercise-modal__option exercise-modal__input"
                        size="small"
                        fullWidth={false}
                        value={exerciseItem.RPE}
                    />
                    <TextField
                        className="exercise-modal__metadata exercise-modal__input"
                        rows={3}
                        multiline
                        label="Additional information"
                        value={exerciseItem.metadata}
                    />
                </div>
                <div className="exercise-modal__bottom">
                    <Button variant="contained">Save exercise</Button>
                </div>
            </Box>
        </Modal>
    );
};

export default ExerciseModal;
