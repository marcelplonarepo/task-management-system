import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userAction } from "../../store";
import { useNavigate } from 'react-router-dom';
import styles from "./Login.module.css"
import { EmailSVG } from "../../assets/Email";
import { PasswordSVG } from "../../assets/Password";
import { Link } from "react-router-dom";
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);



    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    }

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    }


    const loginHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/login", {
            email,
            password
        }).then(result => {
            if (result.data) {
                dispatch(userAction.setUser({ user: result.data }));
                localStorage.setItem("pseudotoken", result.data.email + "#" + result.data.password);
                navigate('/tasks');
            }
        })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div className={styles.login}>
            <form  className={styles.form} onSubmit={loginHandler}>
           
                <div className={styles.title}>
                    <div>Login</div>
                </div>
                <div className={styles.inputBox}>
                    <div>
                        <EmailSVG/>
                    </div>
                    <input type="text" onChange={emailChangeHandler}></input>
                </div>
                <div className={styles.inputBox}>
                    <div>
                        <PasswordSVG/>
                    </div>
                    <input type="text" onChange={passwordChangeHandler}></input>
                </div>
                <div className={styles.inputBox}>
                    <input value="Send" type="submit"></input>
                </div>
                <Link to="/register" className={styles.link}>Not register? <span>Sing up</span></Link>
            </form>
        </div>
    )


    
}

export default Login;