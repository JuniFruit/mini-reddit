import { NavBar } from '../components/NavBar/NavBar';
import { PageContent } from '../components/PageContent/PageContent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { useState, useEffect, createContext } from 'react';
import { Login } from '../components/Login/Login';
import { LoadingBar } from '../features/LoadingBar/LoadingBar'
import { SinglePost } from '../components/PostComponent/SinglePost';
import { TopNews } from '../features/TopNewsFeature/TopNews';
import { ErrorsList } from '../features/ErrorPopup/ErrorsList';
import { NotFound } from '../components/PageContent/NotFoundPage';
import { SearchPage } from '../components/SearchResults/SearchPage';
import React from 'react';
import { CheckUser } from '../components/Login/CheckUser';


export const MobileContext = createContext(null);

const App = () => {
  /* eslint-disable */

  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const isMobile = width <= 769


  return (
    <BrowserRouter>
      <div className="App">

        <div className='app-page'>
          <MobileContext.Provider value={isMobile}>
            <CheckUser />
            <NavBar />
            <ErrorsList />
            <Routes>
              
              <Route path='/' element={<><TopNews /><PageContent /></>} />
              <Route path='reddit_login' element={<Login />} />
              <Route path='/r' >
                <Route path=':subreddit' element={<PageContent />} />
                <Route path=':subreddit/comments/:postId/:title/' element={<SinglePost />} />
              </Route>
              <Route path='/search' element={<SearchPage />} />


              <Route path='*' element={<NotFound />} />
            </Routes>
          </MobileContext.Provider>

        </div>
        <LoadingBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
