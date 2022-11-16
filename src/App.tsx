import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import About from './Components/About/About';
import Login from './Components/auth/Login';
import SignUp from './Components/auth/SignUp';
import PrivateRouter from './Components/auth/PrivateRouter';
import Header from './Components/Header/Header';
import Services from './Components/Services/Services';
import Menu from './Components/Menu/Menu';
import EditService from './Components/Services/EditService';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <PrivateRouter>
              <Menu defaultDisplay='grid' />
            </PrivateRouter>
          } />
        <Route
          path='/services'
          element={
            <PrivateRouter>
              <Services />
            </PrivateRouter>
          } />

        <Route
          path='/about'
          element={
            <PrivateRouter>
              <About />
            </PrivateRouter>
          } />
        <Route
          path='/editService'
          element={
            <PrivateRouter>
              <EditService />
            </PrivateRouter>
          } />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
