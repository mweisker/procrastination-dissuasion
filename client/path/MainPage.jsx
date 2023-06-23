import React, { useState, useEffect } from 'react';
import TaskForm from '../components/taskForm.jsx';
import TaskDisplay from '../components/taskDisplay.jsx';
import getCookie from '../util/getCookie.js'

import { useNavigate } from 'react-router-dom';

export default function MainPage(props) {
  const [userInfo, setUserInfo] = useState({userId: null, userName: null});

  const [taskData, setTaskData] = useState([]);
  const [newData, setNewData] = useState(false);

  // console.log(props.userInfo);
  // let { userName, userId } = props.userInfo;
  // if (!userId) userId = 10;
  // console.log('name ', userName);
  // console.log('id ', userId)

  console.log('cookie')
  // console.log('cookie ', getCookie('user'))
  // const cookieVal = getCookie('user');
  // console.log(cookieVal)
  // const parsedCookie = JSON.parse(cookieVal.slice(2));
  // console.log(parsedCookie);

  // setUserInfo({userId: parsedCookie.userid, userName: parsedCookie.username})

  const { userName, userId } = userInfo

  useEffect(() => {
    const cookieVal = getCookie('user');
    console.log(cookieVal)
    const parsedCookie = JSON.parse(cookieVal.slice(2));
    console.log(parsedCookie);
  
    setUserInfo({userId: parsedCookie.userid, userName: parsedCookie.username})
    setNewData(true);
  
  }, [])


  useEffect(() => {
    console.log('user info ', userInfo)
    if (!userInfo.userId) return;
    const getTaskData = async () => {
      const result = await fetch(`/task/${userId}`);
      console.log(result);
      if (result.status === 400) return alert('You done fucked up now')
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
      { taskData.map((data, i) => (
        < TaskDisplay taskData={data} setNewData={setNewData} key={`TaskDisplay#${i}`} />
      ))}
      <br></br>
      <button onClick={() => navigate('/')}>Log out</button>
    </div>
  )
}