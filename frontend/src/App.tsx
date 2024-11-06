import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthPage from './Pages/AuthPage/AuthPage';
import ShopPage from './Pages/ShopPage/ShopPage';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import DetailCanPage from './Pages/DetailCanPage/DetailCanPage';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Header/>
      <div className='main'>
        <Routes>
          <Route path='main' element={<ShopPage/>}/>
          <Route path='auth' element={<AuthPage/>}/>
          <Route path='main/detail' element={<DetailCanPage/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
