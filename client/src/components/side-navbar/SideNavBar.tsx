import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "./SideNavBar.scss";
import { SideNavbarTypes } from "./SideNavbar.types";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const SideNavBar = ({ showSideNavbar }: SideNavbarTypes) => {
    const logOutHandler = () => {};

    return (
        <section
            className={`side-navbar side-navbar--${
                showSideNavbar ? "show" : "hide"
            }`}
        >
            <div className="side-navbar__option">
                <NavLink
                    to="/exercises"
                    className={({ isActive }) =>
                        isActive ? "active" : undefined
                    }
                >
                    Exercises
                    <ArrowForwardIosRoundedIcon />
                </NavLink>
            </div>
            <div className="side-navbar__option">
                <NavLink
                    to="/workouts"
                    className={({ isActive }) =>
                        isActive ? "active" : undefined
                    }
                >
                    Workouts
                    <ArrowForwardIosRoundedIcon />
                </NavLink>
            </div>
            {/* <div className="side-navbar__option">
                <NavLink
                    to="/account"
                    className={({ isActive }) =>
                        isActive ? "active" : undefined
                    }
                >
                    <span>Account</span>
                    <ArrowForwardIosRoundedIcon />
                </NavLink>
            </div> */}
            <div className="side-navbar__option">
                <Link to="/" onClick={logOutHandler}>
                    Log out
                    <ArrowForwardIosRoundedIcon />
                </Link>
            </div>
        </section>
    );
};

export default SideNavBar;
