import GenericFilters from "../../components/generic-filters/GenericFilters";
import AddButton from "../../UI/add-button/AddButton";

const WorkoutsPage = () => {
    const newWorkoutHandler = () => {};

    return (
        <section className="workouts">
            <div className="workouts__new">
                <AddButton
                    text="Create new workout"
                    onClickHandler={newWorkoutHandler}
                />
            </div>

            <GenericFilters />

            <div className="workouts__list"></div>
        </section>
    );
};

export default WorkoutsPage;
