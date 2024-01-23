import { AddButtonTypes } from "./AddButton.types";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Button } from "@mui/material";
import "./AddButton.scss";

const AddButton = ({ text, onClickHandler }: AddButtonTypes) => {
    return (
        <Button
            className="add-button"
            variant="outlined"
            onClick={onClickHandler}
        >
            <span>{text}</span>
            <AddRoundedIcon />
        </Button>
    );
};

export default AddButton;
