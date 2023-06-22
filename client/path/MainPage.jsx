import React from 'react';

import { useNavigate } from 'react-router-dom';

export default function MainPage(props) {
  const navigate = useNavigate();
  console.log(props.userInfo);
  const { userName, userId } = props.userInfo
  console.log(userName);
  console.log(userId)
  return (
    <div>
      <h1>PROCRASTINATION DISSUASION</h1>
      <h2>{userId}</h2>
      <h2>{userName}</h2>
      <button onClick={() => navigate('/')}>Log out</button>
    </div>
  )
}