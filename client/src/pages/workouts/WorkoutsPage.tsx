import GenericFilters from "../../components/generic-filters/GenericFilters";

const WorkoutsPage = () => {
    return (
        <section className="workouts">
            <div className="workouts__new">
                <span>Create new workout</span>
                <span className="material-symbols-rounded">add</span>
            </div>

            <GenericFilters />

            <div className="workouts__list"></div>
        </section>
    );
};

export default WorkoutsPage;
