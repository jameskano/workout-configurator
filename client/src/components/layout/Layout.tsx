import SideNavBar from "../side-navbar/SideNavBar";
import { LayoutTypes } from "./Layout.types";
import "./Layout.scss";
import { useLocation } from "react-router";
import { useState } from "react";

const Layout = ({ currentPageComponent }: LayoutTypes) => {
    const location = useLocation();

    const [isSideNavbarShown, setIsSideNavbarShown] = useState(false);

    const sideNavbarHandler = () =>
        setIsSideNavbarShown((prevState) => !prevState);

    return (
        <section className="layout">
            <div className="layout__header">
                <span
                    className="material-symbols-rounded"
                    onClick={sideNavbarHandler}
                >
                    menu
                </span>
                <h1 className="exercises__title">
                    {location.pathname.slice(1).charAt(0).toUpperCase() +
                        location.pathname.slice(2)}
                </h1>
            </div>
            <div className="layout__main-content">
                <SideNavBar showSideNavbar={isSideNavbarShown} />
                {currentPageComponent}
            </div>
        </section>
    );
};

export default Layout;
