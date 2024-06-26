import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "./SideNavBar.scss";
import { SideNavbarTypes } from "./SideNavbar.types";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const SideNavBar = ({ showSideNavbar, setIsSideNavbarShown }: SideNavbarTypes) => {
	const logOutHandler = () => {};

	const sideNavbarHandler = () => setIsSideNavbarShown(false);

	return (
		<section className={`side-navbar side-navbar--${showSideNavbar ? "show" : "hide"}`}>
			<div className="side-navbar__option">
				<NavLink
					to="/exercises"
					onClick={sideNavbarHandler}
					className={({ isActive }) => (isActive ? "active" : undefined)}>
					Exercises
					<ArrowForwardIosRoundedIcon />
				</NavLink>
			</div>
			<div className="side-navbar__option">
				<NavLink
					to="/workouts"
					onClick={sideNavbarHandler}
					className={({ isActive }) => (isActive ? "active" : undefined)}>
					Workouts
					<ArrowForwardIosRoundedIcon />
				</NavLink>
			</div>
			{/* <div className="side-navbar__option">
                <NavLink
                    to="/planing (or something like that)"
                    onClick={sideNavbarHandler}
                    className={({ isActive }) =>
                        isActive ? "active" : undefined
                    }
                >
                    <span>Account</span>
                    <ArrowForwardIosRoundedIcon />
                </NavLink>
            </div> */}
			{/* <div className="side-navbar__option">
                <NavLink
                    to="/account"
                    onClick={sideNavbarHandler}
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
