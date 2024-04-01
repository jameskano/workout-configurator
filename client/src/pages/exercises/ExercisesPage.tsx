import { useState } from "react";
import GenericFilters from "../../components/generic-filters/GenericFilters";
import { createPortal } from "react-dom";
import ExerciseModal from "../../components/exercise-modal/ExerciseModal";
import "./ExercisesPage.scss";
import AddButton from "../../UI/add-button/AddButton";
import { useQuery } from "@tanstack/react-query";
import { ExerciseType } from "../../utils/types/exercise.types";
import ExerciseCard from "../../components/exercise-card/ExerciseCard";
import { getAllExercisesFn } from "./functions/services";

const ExercisesPage = () => {
	const { isLoading, isError, data, error } = useQuery({
		queryKey: ["exercises"],
		queryFn: getAllExercisesFn,
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
				<AddButton text="Add new exercise" onClickHandler={newExerciseHandler} />
			</div>

			<GenericFilters />

			<div className="exercises__list">
				{data?.map(({ _id, RPE, reps, sets, title, metadata, bodyPart }: ExerciseType) => {
					return (
						<ExerciseCard
							key={_id}
							title={title}
							sets={sets}
							reps={reps}
							RPE={RPE}
							metadata={metadata}
							bodyPart={bodyPart}
							_id={_id}
							setShowExerciseModal={setShowExerciseModal}
							setIsEditExerciseMode={setIsEditExerciseMode}
						/>
					);
				})}
			</div>

			{createPortal(
				<ExerciseModal
					showModal={showExerciseModal}
					setShowModal={setShowExerciseModal}
					isEditMode={isEditExerciseMode}
				/>,
				document.querySelector("#modal-root")!,
			)}
		</section>
	);
};

export default ExercisesPage;
