import { NavBar } from '../components/NavBar/NavBar';
import { PageContent } from '../components/PageContent/PageContent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import { Login } from '../components/Login/Login';
import { LoadingBar } from '../features/LoadingBar/LoadingBar'
import { SinglePost } from '../components/PostComponent/SinglePost';
import { TopNews } from '../features/TopNewsFeature/TopNews';
import { ErrorsList } from '../features/ErrorPopup/ErrorsList';
import { NotFound } from '../components/PageContent/NotFoundPage';
import { SearchPage } from '../components/SearchResults/SearchPage';

const App = () => {



  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <ErrorsList />
        <div className='app-page'>

          <Routes>
            <Route path='/' element={<><TopNews /><PageContent /></>} />
            <Route path='reddit_login' element={<Login />} />
            <Route path=':sort' element={<><TopNews /><PageContent /></>} />




            <Route path='/r' >
              <Route path=':subreddit' element={<PageContent />} />
              <Route path=':subreddit/:sort' element={<PageContent />} />
              <Route path=':subreddit/comments/:postId/:title/' element={<SinglePost />} />
            </Route>
            <Route path='/search' element={<SearchPage />} />
            

            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
        <LoadingBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
