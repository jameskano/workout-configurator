import SideNavBar from "../side-navbar/SideNavBar";
import { LayoutTypes } from "./Layout.types";

const Layout = ({ currentPageComponent }: LayoutTypes) => {
    return (
        <section className="layout">
            <SideNavBar />
            {currentPageComponent}
        </section>
    );
};

export default Layout;
