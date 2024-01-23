import { ExerciseType } from "utils/types/exercise.types";
import "./ExerciseCard.scss";

const ExerciseCard = ({
    title,
    sets,
    reps,
    RPE,
    metadata,
    bodyPart,
}: ExerciseType) => {
    return (
        <div className="exercise-card">
            <div className="exercise-card__title">
                <h2>{title}</h2>
            </div>
            <div className="exercise-card__content">
                <div className="exercise-card__sets">
                    <h3>Sets</h3>
                    <span>{sets}</span>
                </div>
                <div className="exercise-card__reps">
                    <h3>Reps</h3>
                    <span>{reps}</span>
                </div>
                <div className="exercise-card__rpe">
                    <h3>RPE</h3>
                    <span>{RPE}</span>
                </div>
            </div>
            <div className="exercise-card__metadata">
                <h3>Notes</h3>
                <span>{metadata}</span>
            </div>
        </div>
    );
};

export default ExerciseCard;
