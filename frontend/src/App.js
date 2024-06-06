import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Tasks from './pages/tasks/Tasks';
import Add from './pages/addTasks/Add';
import Calendar from './pages/calendar/Calendar';
import Account from './pages/account/Account';
import Logout from './pages/logout/Logout';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/tasks" element={<Tasks/>}/>
        <Route path="/tasks/add" element={<Add/>}/>
        <Route path="/calendar" element={<Calendar/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/logout" element={<Logout/>}/>
      </Routes>
    </div>
  );
}

export default App;
