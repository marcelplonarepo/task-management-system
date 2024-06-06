import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Logout = () => {

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("pseudotoken");
        navigate("/");
    }, [navigate])

    return (
        <div>
            In progress...
        </div>
    )
}

export default Logout;