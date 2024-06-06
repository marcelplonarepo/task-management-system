import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import TasksList from "../assets/TasksList";
import Account from "../assets/Account";
import Logout from "../assets/Logout";
import Calendar from "../assets/Calendar";
const Navbar = () => {
    return (

        <div className={styles.navbar}>

            <Link to="/tasks">
                <div className={`${styles.item} ${styles.stroke}`}>
                    <TasksList />
                    <div>Tasks</div>
                </div>
            </Link>

            <Link to="/account">
                <div className={`${styles.item} ${styles.stroke}`}>
                    <Account className={styles.bb} />
                    <div>Account</div>
                </div>
            </Link>
            <Link to="/calendar">
                <div className={`${styles.item} ${styles.fill}`}>
                    <Calendar />
                    <div>Calendar</div>
                </div>
            </Link>
            <Link to="/logout">
                <div className={`${styles.item} ${styles.fill}`}>
                    <Logout />
                    <div>Logout</div>
                </div>
            </Link>
        </div>
    );
}

export default Navbar;