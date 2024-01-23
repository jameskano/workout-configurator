import axios from "axios";

export const getAllExercises = () => {
    const config = {
        method: "GET",
        url: `${import.meta.env.VITE_WORKOUT_API}/exercise`,
    };

    return axios(config);
};
