import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import styles from "./Add.module.css";
import Loupe from "../../assets/Loupe";
import useAuth from "../../hooks/useAuth";

const Add = () => {
    const user = useSelector(state => state.user);
    const { id: userId } = user;
    const navigate = useNavigate();
    const [friendId, setFriendId] = useState(userId);
    const [check, setCheck] = useState(false);
    const [text, setText] = useState("");
    const [deadline, setDeadline] = useState(new Date(Date.now()).toISOString().split('T')[0]);
    const [points, setPoints] = useState("");
    const [search, setSearch] = useState("");
    const [reward, setReward] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [showDataPicker, setShowDataPicker] = useState(false);

    useAuth();

    //dodaje zadanie do bazy danych

    const addTaskHandler = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:5000/users/${userId}/tasks`, {
            points,
            deadline,
            text,
            friendId,
            reward
        })
            .then(result => {
                if (result.data) {
                    navigate('/tasks');
                }
            })
            .catch(err => {
                console.log(err);
            })
    }


    const pointsChangeHandler = (e) => {
        setPoints(e.target.value);
    }

    const rewardChangeHandler = (e) => {
        setReward(e.target.value);
    }

    const deadlineChangeHandler = (e) => {
        setDeadline(e.target.value);
    }
    const textChangeHandler = (e) => {
        setText(e.target.value);
    }

    const setFriend = (friendIdValue) => {
        setFriendId(friendIdValue);
    }

    const changeDeadline = (e) => {

        setShowDataPicker((showData) => {return false});


        if(e.target.value === "1"){
            setDeadline(new Date(Date.now() + 1000 * 60 * 60 * 24 * 1).toISOString().split('T')[0]);
        }
        else if(e.target.value === "2"){
            setDeadline(new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString().split('T')[0]);
        }
        else if(e.target.value === "3"){
            setDeadline(new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString().split('T')[0]);
        }
        else if(e.target.value === "4"){
            setShowDataPicker(true);
        }
    }


    //sprawdza uzytkownikow pod wyszukiwana frazą

    useEffect(() => {
        if (search !== "" && userId) {
            axios(`http://localhost:5000/users/${userId}/search/${search}`)
                .then(result => {
                    setSearchResult(result.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }

    }, [search])

    return (
        <div className={styles.add}>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.title}>Add task</div>
                <form className={styles.form} onSubmit={addTaskHandler}>
                    <div>
                        <div className={styles.text}>
                            <label>Text</label>
                            <textarea type="text" onChange={textChangeHandler}></textarea>
                        </div>
                    </div>
                    <div>
                        <div className={styles.toggle}>
                            <label>Check by</label>
                            <div className={styles.switch}>
                                <div onClick={() => {
                                    setCheck(false)
                                    setFriendId(userId)
                                }} className={`${!check ? styles.selected : styles.notselected}`}>Yourself</div>
                                <div onClick={() => { setCheck(true) }} className={`${check ? styles.selected : styles.notselected}`}>Friend</div>
                            </div>
                            {check &&
                                <div className={styles.search}>
                                    <div><Loupe /></div>
                                    <input onInput={(e) => { setSearch((e.target.value)) }} type="text"></input>
                                </div>}
                            {((search !== "" && searchResult.length === 0 && check) && <div>User not found</div>)}
                            {((search !== "" && searchResult.length !== 0 && check) && searchResult.map(singleUser => {
                                return <div key={singleUser.id} className={`${styles.users} ${singleUser.id === friendId && styles.friend}`} onClick={() => { setFriend(singleUser.id) }} >{singleUser.username}</div>
                            }))}
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Task points</label>
                            <input type="text" onChange={pointsChangeHandler}></input>
                        </div>
                        <div>
                            <label>Reward</label>
                            <input type="text" onChange={rewardChangeHandler}></input>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Deadline</label>
                            <div>
                                <select onChange={changeDeadline}>
                                    <option value="1">1 day</option>
                                    <option value="2">1 week</option>
                                    <option value="3">1 month</option>
                                    <option value="4">Custom date</option>
                                </select>
                                {showDataPicker && <input type="date" onChange={deadlineChangeHandler} value={deadline}></input>}
                            </div>

                        </div>
                    </div>



                    <input type="submit" value="Create"></input>
                </form>

            </div>
        </div>
    )
}

export default Add;