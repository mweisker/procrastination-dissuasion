import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './path/SignIn.jsx';
import MainPage from './path/MainPage.jsx';


const App = () => {
  return (
    <div>
      <h1>Look at me right now!</h1>
      <Routes>
        <Route path='/' element={ <SignIn/>} />
        <Route path='/main-page' element={ <MainPage/>} />
      </Routes>
    </div>
  )
}

export default App;