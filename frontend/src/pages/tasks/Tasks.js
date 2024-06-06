import Navbar from "../../components/Navbar";
import styles from "./Tasks.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Add from "../../assets/Add";
import FilterForm from "./FilterForm";
import SortForm from "./SortForm";
import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import Filter from "../../assets/Filter";
import Sort from "../../assets/Sort";
import useAuth from "../../hooks/useAuth";
import useOptions from "../../hooks/useOptions";
const Tasks = () => {
    const user = useSelector(state => state.user);
    const { id: userId } = user;
    const [data, setData] = useState(null);
    const [render, setRender] = useState(null);
    const [othersTasks, setOthersTasks] = useState(null);
    const [optionType, setOptionType] = useState(1);
    const filterInit = {
        status: "3",
        textSearch: "",
        minPoints: "",
        maxPoints: "",
        type: "1",
        start: "",
        end: "",
    }

    const sortInit = {
        sortBy: "0",
        order: "1"
    }

    const [filters, setFilter] = useState(filterInit);
    const [sorts, setSort] = useState(sortInit);


    //sprawdza haslo

    useAuth();

    //pobiera zadania uzytkownika i powiazane z nim zadania innych

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:5000/users/${userId}/tasks`)
                .then(result => {
                    setData(result.data);
                    axios.get(`http://localhost:5000/users/${userId}/tasks/others`)
                        .then(othersTasksResult => {
                            setOthersTasks(othersTasksResult.data);
                        }).catch(err => {
                            console.log(err);
                        })
                })
                .catch(err => {
                    console.log(err);
                })
        }

    }, [userId])

    //ustawia zadanie na zrobione, i pobiera nowe dane 

    const taskIsDone = (e, id) => {

        if (e.target.checked) {
            axios.patch(`http://localhost:5000/users/${userId}/tasks/${id}`, {
                status: 1
            })
                .then(result => {
                    if (result.data) {

                        let dataSet;
                        if (filters && filters.type === "1") {
                            dataSet = data.tasks;
                        } else if (filters && filters.type === "2") {
                            dataSet = othersTasks;
                        }

                        const newTasks = dataSet.map(task => {
                            if (task.id === id) {
                                task.status = true;
                            }
                            return task;
                        })

                        if (filters && filters.type === "1") {
                            setData({ ...data, tasks: newTasks })
                        } else if (filters && filters.type === "2") {
                            setOthersTasks(newTasks);
                        }


                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }



    const setStatus = (e) => {
        setFilter({ ...filters, status: e.target.value });
    }

    const setTextSearch = (e) => {
        setFilter({ ...filters, textSearch: e.target.value });
    }

    const setType = (e) => {
        setFilter({ ...filters, type: e.target.value });
    }

    const setMinPoints = (e) => {
        setFilter({ ...filters, minPoints: e.target.value });
    }

    const setMaxPoints = (e) => {
        setFilter({ ...filters, maxPoints: e.target.value });
    }

    const setEnd = (e) => {
        setFilter({ ...filters, end: e.target.value });
    }

    const setStart = (e) => {
        setFilter({ ...filters, start: e.target.value });
    }

    const setSortBy = (e) => {
        setSort({ ...sorts, sortBy: e.target.value });
    }

    const setOrder = (e) => {
        setSort({ ...sorts, order: e.target.value });
    }

    //kopiowanie zadan

    const copyTask = (e, taskData) => {
        axios.post(`http://localhost:5000/users/${userId}/tasks`, {
            points: taskData.points,
            deadline: taskData.deadline,
            text: taskData.text,
            friendId: taskData.userId,
            reward: taskData.reward
        })
            .then(result => {
                if (result.data) {
                    const newTasks = [...data.tasks, result.data];
                    setData({ ...data, tasks: newTasks })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    //filtrowanie i sortowanie i wyświetlanie zadań

    useOptions(data, filters, othersTasks, sorts, styles, setRender, userId, copyTask, taskIsDone);

   


    return (
        <div className={styles.tasks}>
            <Navbar />

            {data && (<div className={styles.list}>

                <div className={styles.options}>
                    {optionType === 1 ? <FilterForm filters={filters} setType={setType} setStatus={setStatus} setTextSearch={setTextSearch} setMinPoints={setMinPoints} setMaxPoints={setMaxPoints} setStart={setStart} setEnd={setEnd}/> : 
                    <SortForm sorts={sorts} setSortBy={setSortBy} setOrder={setOrder}/>}
                    <div className={styles.switchOption}>
                        <div className={styles.optionType} onClick={() => { setOptionType(1) }}><Filter /></div>
                   
                        <div className={styles.optionType} onClick={() => { setOptionType(2) }}><Sort /></div>
                    </div>
                </div>

                {render}
            </div>)}

            <Link className={styles.add} to="./add">
                <Add />
            </Link>
        </div>
    )
}

export default Tasks;