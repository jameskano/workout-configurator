import { useEffect } from "react";
import { useAppContext } from "../../store/context/app-context/app-context";
import { useNavigate } from "react-router";

const WelcomePage = () => {
    const { logged } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (logged) navigate("/exercises");
    }, []);

    return <div>Welcome page</div>;
};

export default WelcomePage;
