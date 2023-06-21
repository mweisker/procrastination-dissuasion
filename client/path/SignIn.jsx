import React from 'react';

import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Here is the sign in page</h1>
      <button onClick={() => navigate('/main-page')}>Sign in</button>
    </div>
  )
}