import { useState } from "react";
import GenericFilters from "../../components/generic-filters/GenericFilters";
import AddButton from "../../UI/add-button/AddButton";
import { createPortal } from "react-dom";
import WorkoutModal from "../../components/workout-modal/WorkoutModal";

const WorkoutsPage = () => {
	const [showWorkoutModal, setShowWorkoutModal] = useState(false);
	const [isEditWorkoutMode, setIsEditWorkoutMode] = useState(false);

	const newWorkoutHandler = () => {
		setShowWorkoutModal(true);
		setIsEditWorkoutMode(false);
	};

	return (
		<section className="workouts">
			<div className="workouts__new">
				<AddButton text="New workout" onClickHandler={newWorkoutHandler} />
			</div>

			<GenericFilters />

			<div className="workouts__list"></div>

			{createPortal(
				<WorkoutModal
					showModal={showWorkoutModal}
					setShowModal={setShowWorkoutModal}
					isEditMode={isEditWorkoutMode}
				/>,
				document.querySelector("#modal-root")!,
			)}
		</section>
	);
};

export default WorkoutsPage;
