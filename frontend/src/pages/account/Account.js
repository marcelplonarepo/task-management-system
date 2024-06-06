import Navbar from "../../components/Navbar";
import styles from './Account.module.css';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const Account = () => {

    const user = useSelector(state => state.user);
    const { id: userId } = user;

    const [userData, setUserData] = useState(undefined);
    const [taskData, setTaskData] = useState({});

    useAuth();

    //pobieranie zadan i wypisywanie na ich podstawie statystyk

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:5000/users/${userId}/tasks`)
                .then(result => {
                    setUserData(result.data);
                    const newTaskData = {
                        done: 0,
                        undone: 0,
                        all: 0,
                        sumOfPoints: 0

                    };

                    result.data.tasks.forEach(task => {
                        if (task.status) {
                            newTaskData.done += 1;
                            newTaskData.sumOfPoints += task.points;
                        }
                        else if (!task.status) {
                            newTaskData.undone += 1;
                        }
                        newTaskData.all += 1;
                    });

                    setTaskData(newTaskData);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [userId]);



    return (<div className={styles.account}>
        <Navbar></Navbar>
        <div className={styles.flex}>
            <img src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png" style={{ width: "200px", height: "200px" }} alt=""></img>
           
            {taskData && (
                <div className={styles.flex}>
                    <div>{user.username}</div>
                    <div>{`Finished task: ${taskData.done}`}</div>
                    <div>{`Unfinished task: ${taskData.undone}`}</div>
                    <div>{`Number of all task: ${taskData.all}`}</div>
                    <div>{`My points: ${taskData.sumOfPoints}`}</div>
                </div>
            )}
        </div>


    </div>);
}

export default Account;