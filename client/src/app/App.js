import { NavBar } from '../components/NavBar/NavBar';
import { PageContent } from '../components/PageContent/PageContent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import { Login } from '../components/Login/Login';
import { LoadingBar } from '../features/LoadingBar/LoadingBar'
import { SinglePost } from '../components/PostComponent/SinglePost';
import { TopNews } from '../features/TopNewsFeature/TopNews';

const App = () => {



  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <div className='none'>

          <Routes>
            <Route path='/' element={<><TopNews /><PageContent /></>} />
            <Route path='reddit_login' element={<Login />} />
            <Route path=':sort' element={<><TopNews /><PageContent /></>} />




            <Route path='/r' >
              <Route path=':subreddit' element={<PageContent />} />
              <Route path=':subreddit/:sort' element={<PageContent />} />
              <Route path=':subreddit/comments/:postId/:title/' element={<SinglePost />} />
            </Route>
          </Routes>
        </div>
        <LoadingBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
