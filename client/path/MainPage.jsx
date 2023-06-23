import React, { useState, useEffect } from 'react';
import TaskForm from '../components/taskForm.jsx';
import TaskDisplay from '../components/taskDisplay.jsx';

import { useNavigate } from 'react-router-dom';

export default function MainPage(props) {
  const [taskData, setTaskData] = useState([]);
  const [newData, setNewData] = useState(false);

  console.log(props.userInfo);
  let { userName, userId } = props.userInfo;
  if (!userId) userId = 10;
  console.log(userName);
  console.log(userId)

  useEffect(() => {
    const getTaskData = async () => {
      const result = await fetch(`/task/${userId}`);
      console.log(result);
      const parsedResult = await result.json();
      console.log('parsed ', parsedResult);
      setTaskData(parsedResult);
      setNewData(false);
    }
    getTaskData();
  }, [newData])

  console.log('task Data ', taskData);

  const navigate = useNavigate();


  return (
    <div>
      <h1>PROCRASTINATION DISSUASION</h1>
      <h2>{userId}</h2>
      <h2>{userName}</h2>
      < TaskForm setNewData={setNewData} userId={userId} />
      <h1>Task Display</h1>
      { taskData.map(data => (
        < TaskDisplay taskData={data} />
      ))}
      <br></br>
      <button onClick={() => navigate('/')}>Log out</button>
    </div>
  )
}