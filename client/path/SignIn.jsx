import React, { useState, useEffect } from 'react';
import Login from '../components/login.jsx';
import Register from '../components/register.jsx';

import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const [login, setLogin] = useState(true);

  const toggleLogin = () => {
    const swapped = !login;
    setLogin(swapped);
  }

  const navigate = useNavigate();

  return (
    <div className='main-div'>
      <h1>Here is the sign in page</h1>
      <h2>{ !login ? 'Register' : 'Sign in to'} your account</h2>
      { login ? <Login /> : <Register /> }
      <h2>or { login ? 'register' : 'sign in'}</h2>
      <button onClick={toggleLogin}>{ login ? 'Register' : 'Sign in'}</button>

      <br></br>
      <h3>Automatic sign in for ease</h3>
      <button onClick={() => navigate('/main-page')}>Sign in</button>
    </div>
  )
}