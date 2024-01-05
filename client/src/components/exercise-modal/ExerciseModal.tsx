import Modal from "@mui/material/Modal";
import { ExerciseModalTypes } from "./ExerciseModal.types";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import "./ExerciseModal.scss";
import { bodyParts } from "../../utils/constants/app-constants";

const ExerciseModal = ({
    showModal,
    setShowModal,
    isEditMode,
}: ExerciseModalTypes) => {
    const setShowModalHandler = () => setShowModal(false);

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
                    />
                    <Autocomplete
                        disablePortal
                        // value={}
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
                    />
                    <TextField
                        label="Sets"
                        type="number"
                        variant="outlined"
                        className="exercise-modal__option exercise-modal__input"
                        size="small"
                    />
                    <TextField
                        label="RPE"
                        type="number"
                        variant="outlined"
                        className="exercise-modal__option exercise-modal__input"
                        size="small"
                        fullWidth={false}
                    />
                    <TextField
                        className="exercise-modal__metadata exercise-modal__input"
                        rows={3}
                        multiline
                        label="Additional information"
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
