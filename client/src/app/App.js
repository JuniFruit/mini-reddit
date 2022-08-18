
import { NavBar } from '../components/NavBar/NavBar';
import { TopNews } from '../features/TopNewsFeature/TopNews.js';
import { PageContent } from '../components/PageContent/PageContent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import React from 'react';
import { Login } from '../components/Login/Login';
import { LoadingBar } from '../features/LoadingBar/LoadingBar';
import { selectIsSubListLoading } from '../components/SideListing/subredditListSlice';
import { useSelector } from 'react-redux';
import { selectIsPostsLoading } from '../components/PostComponent/postsSlice';
import { selectIsNewsLoading } from '../features/TopNewsFeature/topNewsSlice';
import { selectIsSubredditDataLoading } from '../features/subredditSlice';
import { selectIsUserLoading } from '../components/Login/loginSlice';





const App = () => {

  const subsLoading = useSelector(selectIsSubListLoading);
  const postsLoading = useSelector(selectIsPostsLoading);
  const newsLoading = useSelector(selectIsNewsLoading);
  const subDataLoading = useSelector(selectIsSubredditDataLoading);
  const userLoading = useSelector(selectIsUserLoading);


  const renderLoadingBar = () => {
    const loadingStates = {
      subDataLoading,
      newsLoading,
      userLoading,
      postsLoading,
      subsLoading
    }

    if (Object.values(loadingStates).some(item => item === true)) return <LoadingBar />

    return;
  }

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
      {renderLoadingBar()}
    </div>
  );
}

export default App;
