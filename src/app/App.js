
import { NavBar } from '../features/NavBarFeature/NavBar';
import { TopNews } from '../features/TopNewsFeature/TopNews.js';
import { NewsContainer } from '../features/TopNewsFeature/NewsContainer.js';
import { Post } from '../features/PostComponent/Post';

import './App.css';
import { SortBar } from '../features/SortBarFeature/SortBar';


const App = () => {
  return (
    <div className="App">
      
      <NavBar />
      
      <div className="content-container">

        <div className="topNews-container">
          <h4>Top news</h4>
          <TopNews />
        </div>
        <div className='sortBar'>
          <h4>Popular posts</h4>
          <SortBar />
        </div>
        <div className='post'>
          <Post />
        </div>
      </div>


    </div>
  );
}

export default App;
