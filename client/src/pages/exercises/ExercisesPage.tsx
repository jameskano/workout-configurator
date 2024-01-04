import { useState } from "react";
import GenericFilters from "../../components/generic-filters/GenericFilters";
import { createPortal } from "react-dom";
import ExerciseModal from "../../components/exercise-modal/ExerciseModal";
import "./ExercisesPage.scss";

const ExercisesPage = () => {
    const [showExerciseModal, setShowExerciseModal] = useState(false);
    const [isEditExerciseMode, setIsEditExerciseMode] = useState(false);

    const newExerciseHandler = () => {
        setShowExerciseModal(true);
        setIsEditExerciseMode(true);
    };

    return (
        <section className="exercises">
            <div className="exercises__new" onClick={newExerciseHandler}>
                <span>Add new exercise</span>
                <span className="material-symbols-rounded">add</span>
            </div>

            <GenericFilters />

            <div className="exercises__list"></div>

            {/* {showExerciseModal && */}
            {createPortal(
                <ExerciseModal
                    showModal={showExerciseModal}
                    setShowModal={setShowExerciseModal}
                />,
                document.querySelector("#modal-root")!
            )}
            {/* )} */}
        </section>
    );
};

export default ExercisesPage;
