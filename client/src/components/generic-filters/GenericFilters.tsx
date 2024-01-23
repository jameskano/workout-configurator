import {
    Autocomplete,
    Checkbox,
    FormControlLabel,
    TextField,
} from "@mui/material";
import { bodyParts } from "../../utils/constants/app-constants";
import { useLocation } from "react-router";
import { CheckBox } from "@mui/icons-material";
import "./GenericFilter.scss";

const GenericFilters = () => {
    const { pathname } = useLocation();

    return (
        <section className="generic-filters">
            <TextField
                label="Name"
                type="text"
                variant="outlined"
                className="generic-filters__input"
                size="small"
            />
            {pathname === "/exercises" && (
                <Autocomplete
                    disablePortal
                    // value={}
                    options={Object.values(bodyParts)}
                    // onChange={}
                    // onInputChange={}
                    renderInput={(params) => (
                        <TextField {...params} label="Body part" />
                    )}
                    className="generic-filters__selector"
                    size="small"
                />
            )}
            {pathname === "/workouts" && (
                <FormControlLabel
                    className="generic-filters__checkbox"
                    control={<CheckBox />}
                    label="Show selected workouts"
                />
            )}
        </section>
    );
};

export default GenericFilters;
