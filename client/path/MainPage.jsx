import React from 'react';

import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>PROCRASTINATION DISSUASION</h1>
      <button onClick={() => navigate('/')}>Log out</button>
    </div>
  )
}