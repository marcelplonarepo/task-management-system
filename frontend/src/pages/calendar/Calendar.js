import Navbar from "../../components/Navbar";
import styles from './Calendar.module.css';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ChevronLeft from "../../assets/ChevronLeft";
import ChevronRigth from "../../assets/ChevronRigth";
import useAuth from "../../hooks/useAuth";
const Calendar = () => {

    const user = useSelector(state => state.user);
    const { id: userId } = user;
    const [userData, setUserData] = useState(undefined);
    const [month, setMonth] = useState(new Date(Date.now()).getMonth());
    const [year, setYear] = useState(new Date(Date.now()).getFullYear());
    const [othersTasks, setOthersTasks] = useState(undefined);
    const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    useAuth();

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:5000/users/${userId}/tasks`)
                .then(result => {
                    setUserData(result.data);
                    axios.get(`http://localhost:5000/users/${userId}/tasks/others`)
                        .then(othersTasksResult => {
                            setOthersTasks(othersTasksResult.data);
                        }).catch(err => {
                            console.log(err);
                        })
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [userId]);

    const changeDate = (value) => {
        if (month === 11 && value === 1) {
            setMonth(0);
            setYear((lastyear) => { return lastyear + 1 });
        }
        else if (month === 0 && value === -1) {
            setMonth(11);
            setYear((lastyear) => { return lastyear - 1 });
        }
        else {
            setMonth((lastmonth) => { return lastmonth + value })
        }
    }

    //tworzenie obiektu kalendarz

    const cal = () => {

        const weeks = [];

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let day = 1;

        const returnDay = () => {
            return day;
        }

        let startMonth = false;
        const dayOfWeek = new Date(year, month, 1).getDay();

        //tworzenie tygodni

        for (let i = 0; i < 6; i++) {

            const days = [];

            for (let j = 0; j < 7; j++) {


                const dayInCalendar = new Date(year, month, day);

                if (((dayOfWeek + 6) % 7) === j) {
                    startMonth = true;
                }

                //tworzenie dni i zadan im odpowiadajacych

                days.push(
                    <div key={j} className={styles.day}>
                        <div className={styles.dayOfMonth}>{(startMonth && daysInMonth >= day) && day}</div>

                        {

                            userData && othersTasks && userData.tasks.concat(othersTasks).map((task, index) => {


                                const taskDate = new Date(task.deadline);

                                if (dayInCalendar.getFullYear() === taskDate.getFullYear() &&
                                    dayInCalendar.getMonth() === taskDate.getMonth() &&
                                    dayInCalendar.getDate() === taskDate.getDate() && daysInMonth >= returnDay()) {
                                    if (task.userId === userId && task.friendId === userId) {
                                        return (
                                            <div key={index}>
                                                <div className={styles.mytask}>{task.text}</div>
                                            </div>);
                                    }
                                    else if(task.userId === userId){
                                        return (
                                            <div key={index}>
                                                <div className={styles.halfmytask}>{task.text}</div>
                                            </div>);
                                    }
                                    else {
                                        return (
                                            <div key={index}>
                                                <div className={styles.othertask}>{task.text}</div>
                                            </div>);
                                    }

                                }
                                else {
                                    return <div key={index}></div>;
                                }
                            })}
                    </div>
                )

                if (startMonth) {
                    day += 1;
                }
            }

            weeks.push(
                <div key={i} className={styles.week}>
                    {days}
                </div>
            )

            if (daysInMonth < day) {
                return weeks;
            }
        }
        return weeks;
    }

    return (<div className={styles.calendar}>
        <div className={styles.fixed}>
            <Navbar></Navbar>
        </div>

        <div className={styles.calendarBlock}>
            <div className={styles.date}>Calendar {year} {monthList[month]}</div>
            <div className={styles.month}>
                <div className={styles.week}>
                    <div className={styles.dayname}>Mon</div>
                    <div className={styles.dayname}>Tue</div>
                    <div className={styles.dayname}>Wed</div>
                    <div className={styles.dayname}>Thu</div>
                    <div className={styles.dayname}>Fri</div>
                    <div className={styles.dayname}>Sat</div>
                    <div className={styles.dayname}>Sun</div>
                </div>

                {cal()}

            </div>
            <div className={styles.onchevrons}>
                <button onClick={() => { changeDate(-1) }} className={styles.chevron}>
                    <ChevronLeft></ChevronLeft>
                </button>

                <button onClick={() => { changeDate(1) }} className={styles.chevron}>
                    <ChevronRigth></ChevronRigth>
                </button>
            </div>
        </div>



    </div>);
}

export default Calendar;