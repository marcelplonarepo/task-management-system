import { useEffect } from "react";
import Copy from "../assets/Copy";
import Check from "../assets/Check";

const useOptions = (data, filters, othersTasks, sorts, styles, setRender, userId, copyTask, taskIsDone) => {

     useEffect(() => {

        if (data && data.tasks && filters && othersTasks && sorts) {

            const compare = (a, b, c) => {
                if (a[c] < b[c]) {
                    return -1;
                }
                if (a[c] > b[c]) {
                    return 1;
                }
                return 0;
            }

            //wybieranie zbioru danych

            let dataSet;
            if (filters.type === "1") {
                dataSet = data.tasks;
            }
            else if (filters.type === "2") {
                dataSet = othersTasks;
            }

            //filtrowanie danych

            const filterData = dataSet.filter(task => {
                if (filters.status == 2 && !task.status) {
                    return false;
                }
                else if (filters.status == 3 && task.status) {
                    return false;
                }

                if (filters.textSearch && !task.text.toLowerCase().includes(filters.textSearch.toLowerCase())) {
                    return false;
                }

                if (filters.maxPoints && task.points > filters.maxPoints) {
                    return false;
                }

                if (filters.minPoints && task.points < filters.minPoints) {
                    return false;
                }

                if (filters.start && new Date(task.deadline).getTime() < new Date(filters.start).getTime()) {
                    return false
                }

                if (filters.end && new Date(task.deadline).getTime() > new Date(filters.end).getTime()) {
                    return false
                }

                return true;
            })

            //sortowanie danych

            let sortedData = filterData;
            if (sorts.sortBy === "1") {
                sortedData = sortedData.sort((a, b) => { return compare(a, b, "text") })
            }
            else if (sorts.sortBy === "2") {
                sortedData = sortedData.sort((a, b) => a.points - b.points)
            }
            else if (sorts.sortBy === "3") {
                sortedData = sortedData.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
            }

            if (sorts.sortBy !== "0" && sorts.order === "2") {
                sortedData = sortedData.reverse();
            }

            const newRender = sortedData.map(task => {
                return (
                    <div key={task.id} className={styles.task}>
                        {(task.status) && <div className={styles.check}><Check /></div>}
                        <div className={styles.text}>
                            {(userId === task.friendId && !task.status) && <div className={styles.isDone}><input type="checkbox" onChange={(e) => { taskIsDone(e, task.id, filters.type) }}></input></div>}
                            <div>{task.text}</div>
                        </div>
                        <div className={styles.oninfo}>
                            {filters.type === "2" && <div onClick={(e) => { copyTask(e, task) }} className={styles.copy}><Copy /></div>}
                            {filters.type === "2" && <div className={styles.info + " " + styles.i3}>Username: {task.user && task.user.username}</div>}
                            <div className={styles.info + " " + styles.i1}>Pkt: {task.points}</div>
                            <div className={styles.info + " " + styles.i2}>Deadline: {(new Date(task.deadline)).toLocaleDateString("pl-PL", { month: "short", year: "numeric", day: "numeric" })}</div>
                            <div className={styles.info + " " + styles.i4}>Reward: {task.reward}</div>
                            {(userId !== task.friendId) && <div className={styles.info + " " + styles.i5}>Checked by: {task.friend.username}</div>}
                        </div>

                    </div>);
            })

            setRender(newRender);
        }
    }, [data, filters, othersTasks, sorts])

}

export default useOptions;
