import React, { useState, useEffect } from 'react';
import Login from '../components/login.jsx';
import Register from '../components/register.jsx';

import { useNavigate } from 'react-router-dom';

export default function MainPage(props) {
  const [login, setLogin] = useState(true);

  const toggleLogin = () => {
    const swapped = !login;
    setLogin(swapped);
  }

  const navigate = useNavigate();

  return (
    <div>
      <h1>Here is the sign in page</h1>
      <h2>Sign in to your account</h2>
      { login ? <Login setUserInfo={props.setUserInfo} /> : <Register setUserInfo={props.setUserInfo} /> }
      <h2>Or register</h2>
      <button onClick={toggleLogin}>Register</button>

      <br></br>
      <h3>Automatic sign in for ease</h3>
      <button onClick={() => navigate('/main-page')}>Sign in</button>
    </div>
  )
}