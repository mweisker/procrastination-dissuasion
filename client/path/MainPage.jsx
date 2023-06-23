import React, { useState, useEffect } from 'react';
import TaskForm from '../components/taskForm.jsx';
import TaskDisplay from '../components/taskDisplay.jsx';
import getCookie from '../util/getCookie.js';
import deleteCookie from '../util/deleteCookie.js'

import { useNavigate } from 'react-router-dom';

export default function MainPage(props) {
  const [userInfo, setUserInfo] = useState({userId: null, userName: null});
  const [sort, setSort] = useState('due date');

  const [taskData, setTaskData] = useState([]);
  const [newData, setNewData] = useState(false);

  const { userName, userId } = userInfo

  useEffect(() => {
    const cookieVal = getCookie('user');
    const parsedCookie = JSON.parse(cookieVal.slice(2));  
    setUserInfo({userId: parsedCookie.userid, userName: parsedCookie.username})
    setNewData(true);
  }, [])


  useEffect(() => {
    if (!userInfo.userId) return;
    const getTaskData = async () => {
      const result = await fetch(`/task/${userId}`);
      if (result.status === 400) return alert('An error ocurred')
      const parsedResult = await result.json();


      let sortedResult;

      if (sort === 'dueDate') {
        sortedResult = parsedResult.sort((a, b) => {
          const aDate = new Date(a.duedate);
          const bDate = new Date(b.duedate);
          return aDate - bDate;
        })
      } else if (sort === 'title') {
        sortedResult = parsedResult.sort((a, b) => {
          return a.title.localeCompare(b.title);
        })
      } else if (sort === 'status') {
        const order = {
          "In Progress": 1,
          "Completed": 2,
          "Given Up": 3
        };
        sortedResult = parsedResult.sort((a, b) => {
          const aValue = order[a.status];
          const bValue = order[b.status];
          return aValue - bValue;

        })
      }

      setTaskData(parsedResult);
      setNewData(false);
    }
    getTaskData();
  }, [newData])

  const handleSort = (event) => {
    setSort(event.target.value);
    setNewData(true);
  }

  const handleLogOut = () => {
    deleteCookie('user');
    navigate('/');
  }

  const navigate = useNavigate();

  return (
    <div className='main-div'>
      <div className='welcome'>
        <div className='welcome-container container'>
          <h2>Welcome {userName} to your</h2>
          <h1>PROCRASTINATION DISSUASION</h1>
        </div>
          <img className='logo' src='https://culturedecanted.files.wordpress.com/2015/04/white-rabbit-closeup.jpg?w=640'/>
      </div>
      < TaskForm setNewData={setNewData} userId={userId} />
      <div className='task-display-container'>
        { (taskData.length === 0) ? <h3>You don't have any tasks yet</h3> : null}
        { taskData.map((data, i) => (
          < TaskDisplay taskData={data} setNewData={setNewData} key={`TaskDisplay#${i}`} />
        ))}
      </div>
      <label className='sort-label'>Sort by: </label>
      <select id="sort" value={sort} onChange={handleSort}>
        <option value="dueDate">Due Date</option>
        <option value="title">Title</option>
        <option value="status">Status</option>
      </select>
      <button className='home' onClick={handleLogOut}>Log Out</button>
    </div>
  )
}