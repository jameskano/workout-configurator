import { useState } from "react";
import GenericFilters from "../../components/generic-filters/GenericFilters";
import { createPortal } from "react-dom";
import ExerciseModal from "../../components/exercise-modal/ExerciseModal";
import "./ExercisesPage.scss";
import AddButton from "../../UI/add-button/AddButton";
import { useQuery } from "@tanstack/react-query";
import { getAllExercises } from "../../services/exercises";
import { ExerciseType } from "../../utils/types/exercise.types";
import ExerciseCard from "../../components/exercise-card/ExerciseCard";

const ExercisesPage = () => {
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ["exercises"],
        queryFn: getAllExercises,
    });

    const [showExerciseModal, setShowExerciseModal] = useState(false);
    const [isEditExerciseMode, setIsEditExerciseMode] = useState(false);

    const newExerciseHandler = () => {
        setShowExerciseModal(true);
        setIsEditExerciseMode(false);
    };

    return (
        <section className="exercises">
            <div className="exercises__new">
                <AddButton
                    text="Add new exercise"
                    onClickHandler={newExerciseHandler}
                />
            </div>

            <GenericFilters />

            <div className="exercises__list">
                {data?.data.map(
                    (
                        {
                            RPE,
                            reps,
                            sets,
                            title,
                            metadata,
                            bodyPart,
                        }: ExerciseType,
                        index: number
                    ) => {
                        return (
                            <ExerciseCard
                                key={index + title}
                                title={title}
                                sets={sets}
                                reps={reps}
                                RPE={RPE}
                                metadata={metadata}
                                bodyPart={bodyPart}
                            />
                        );
                    }
                )}
            </div>

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
