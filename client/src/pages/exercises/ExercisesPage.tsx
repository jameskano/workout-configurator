import { useState } from "react";
import GenericFilters from "../../components/generic-filters/GenericFilters";
import { createPortal } from "react-dom";
import ExerciseModal from "../../components/exercise-modal/ExerciseModal";
import "./ExercisesPage.scss";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Button } from "@mui/material";

const ExercisesPage = () => {
    const [showExerciseModal, setShowExerciseModal] = useState(false);
    const [isEditExerciseMode, setIsEditExerciseMode] = useState(false);

    const newExerciseHandler = () => {
        setShowExerciseModal(true);
        setIsEditExerciseMode(false);
    };

    return (
        <section className="exercises">
            <Button className="exercises__new" onClick={newExerciseHandler}>
                <span>Add new exercise</span>
                <AddRoundedIcon />
            </Button>

            <GenericFilters />

            <div className="exercises__list"></div>

            {createPortal(
                <ExerciseModal
                    showModal={showExerciseModal}
                    setShowModal={setShowExerciseModal}
                    isEditMode={isEditExerciseMode}
                />,
                document.querySelector("#modal-root")!
            )}
        </section>
    );
};

export default ExercisesPage;
