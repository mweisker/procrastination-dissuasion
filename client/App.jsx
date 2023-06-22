import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './path/SignIn.jsx';
import MainPage from './path/MainPage.jsx';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={ <SignIn/>} />
        <Route path='/main-page' element={ <MainPage/>} />
      </Routes>
    </div>
  )
}

export default App;