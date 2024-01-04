import Modal from "@mui/material/Modal";
import { ExerciseModalTypes } from "./ExerciseModal.types";
import { Autocomplete, Box, TextField } from "@mui/material";
import "./ExerciseModal.scss";
import { bodyParts } from "../../utils/constants/app-constants";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

const ExerciseModal = ({ showModal, setShowModal }: ExerciseModalTypes) => {
    const setShowModalHandler = () => setShowModal(false);

    return (
        <Modal
            open={showModal}
            onClose={setShowModalHandler}
            className="exercise-modal"
            disablePortal
        >
            <Box component="form" className="exercise-modal__form">
                <span className="exercise-modal__info"></span>

                <TextField
                    label="Exercise title"
                    type="text"
                    variant="outlined"
                    className="exercise-modal__title"
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
                    className="exercise-modal__option"
                />
                <TextField
                    label="Reps"
                    type="number"
                    variant="outlined"
                    className="exercise-modal__option"
                />
                <TextField
                    label="Sets"
                    type="number"
                    variant="outlined"
                    className="exercise-modal__option"
                />
                <TextField
                    label="RPE"
                    type="number"
                    variant="outlined"
                    className="exercise-modal__option"
                />
                <TextareaAutosize
                    maxRows={2}
                    placeholder="Additional information"
                />
            </Box>
        </Modal>
    );
};

export default ExerciseModal;
