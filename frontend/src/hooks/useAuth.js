import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userAction } from "../store";


const useAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!localStorage.getItem("pseudotoken")) {
            navigate('/');
        }
        else if (localStorage.getItem("pseudotoken").split("#").length === 2) {
            axios.post("http://localhost:5000/login", {
                email: localStorage.getItem("pseudotoken").split("#")[0],
                password: localStorage.getItem("pseudotoken").split("#")[1],
            }).then(result => {
                console.log(result.data)
                if (!result.data) {
                    navigate('/');
                }
                else {
                    dispatch(userAction.setUser({ user: result.data }));
                }
            })
                .catch(err => {
                    console.log(err);
                    navigate('/');
                })
        }
        else {
            navigate('/');
        }
    }, []);

}

export default useAuth;