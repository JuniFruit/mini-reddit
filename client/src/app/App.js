
import { NavBar } from '../features/NavBarFeature/NavBar';
import { TopNews } from '../features/TopNewsFeature/TopNews.js';
import { PostsList } from '../features/PostFeature/PostsList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { SortBar } from '../features/SortBarFeature/SortBar';
import React from 'react';
import { Login } from '../components/Login/Login';
import { SubredditList } from '../features/SubredditListFeature/SubredditList';



const App = () => {



  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route path='/reddit_login' element={<Login />} />
        </Routes>
        <NavBar />
        <div className='page-container'>
          <Routes>
            <Route path='/' element={<><TopNews /></>} />
          </Routes>
       
          <div className='content-container'>
            <h4>Popular posts</h4>
            <div className='content-wrapper'>
              <div className='content-posts'>

                <Routes>
                  <Route path='/' element={<><SortBar /> <PostsList /></>} />
                </Routes>
              </div>
              <div className='content-top-subreddits'>
                <Routes>
                  <Route path='/' element={<SubredditList />} />
                </Routes>
              </div>
            </div>


          </div>
        </div>








      </BrowserRouter>

    </div>
  );
}

export default App;
