
import { NavBar } from '../features/NavBarFeature/NavBar';
import { TopNews } from '../features/TopNewsFeature/TopNews.js';
import { PageContent } from '../features/PageContentFeature/PageContent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import React from 'react';
import { Login } from '../components/Login/Login';





const App = () => {



  return (
    <div className="App">
      <NavBar />
      <div className='page-container'>
        <BrowserRouter>

          <Routes>
            <Route path='reddit_login' element={<Login />} />
          </Routes>
          

          

          <Routes>

            <Route path='/' element={<><TopNews /> <PageContent /></>}>
              <Route path=':sort' element={<><TopNews /> <PageContent /></>} />
              <Route path='r/:subreddit' element={<PageContent />} />
              <Route path='r/:subreddit/:sort' element={<PageContent />} />
            </Route>


          </Routes>


          











        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
