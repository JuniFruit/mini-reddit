
import { NavBar } from '../features/NavBarFeature/NavBar';
import { TopNews } from '../features/TopNewsFeature/TopNews.js';
import { PostsList } from '../features/PostFeature/PostsList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { SortBar } from '../features/SortBarFeature/SortBar';
import React from 'react';
import { Login } from '../components/Login/Login';


const App = () => {



  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/reddit_login' element={<Login />} />
          </Routes>
          <NavBar />  
          <div className='content-container'>
            <Routes>
              <Route path='/' element={<><TopNews /> <SortBar/> <PostsList/></>} />
            </Routes>
          </div>
          
        






      </BrowserRouter>

    </div>
  );
}

export default App;
