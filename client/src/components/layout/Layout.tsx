import SideNavBar from "../side-navbar/SideNavBar";
import { LayoutTypes } from "./Layout.types";
import "./Layout.scss";
import { useLocation } from "react-router";
import { useState } from "react";
import { pageTitle } from "../../utils/constants/page-title";

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
                    {
                        (pageTitle as any)[
                            location.pathname.slice(1).toUpperCase()
                        ]
                    }
                </h1>
            </div>
            {/* <SideNavBar showSideNavbar={isSideNavbarShown} />
            {currentPageComponent} */}
            <div className="layout__body">
                <SideNavBar showSideNavbar={isSideNavbarShown} />
                <div className="layout__main-content">
                    {currentPageComponent}
                </div>
            </div>
        </section>
    );
};

export default Layout;
