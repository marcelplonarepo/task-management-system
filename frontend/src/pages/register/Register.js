import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userAction } from "../../store";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { EmailSVG } from "../../assets/Email";
import { UserSVG } from "../../assets/User";
import { PasswordSVG } from "../../assets/Password";
import styles from "./Register.module.css";
const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);

    const usernameChangeHandler = (e) => {
        setUsername(e.target.value);
    }
    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    }

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    }


    const registerHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/users", {
            username,
            email,
            password
        }).then(result => {
            if (result.data) {
                dispatch(userAction.setUser({ user: result.data }));
                navigate('/tasks');
            }
        })
            .catch(err => {
                console.log(err);
            })
    }

    return (


        <div className={styles.register}>
            <form className={styles.form} onSubmit={registerHandler}>

                <div className={styles.title}>
                    <div>Register</div>
                </div>
                <div className={styles.inputBox}>
                    <div>
                        <UserSVG />
                    </div>
                    <input type="text" onChange={usernameChangeHandler}></input>
                </div>
                <div className={styles.inputBox}>
                    <div>
                        <EmailSVG />
                    </div>
                    <input type="text" onChange={emailChangeHandler}></input>
                </div>
                <div className={styles.inputBox}>
                    <div>
                        <PasswordSVG />
                    </div>
                    <input type="text" onChange={passwordChangeHandler}></input>
                </div>
                <div className={styles.inputBox}>
                    <input value="Send" type="submit"></input>
                </div>
                <Link to="/login" className={styles.link}>Have an account? <span>Sign in</span></Link>
            </form>
        </div>
    )
}

export default Register;