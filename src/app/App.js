
import { NavBar } from '../features/NavBarFeature/NavBar';
import { TopNews } from '../features/TopNewsFeature/TopNews.js';
import { NewsContainer } from '../features/TopNewsFeature/NewsContainer.js';

import './App.css';


const App = () => {
  return (
    <div className="App">
      
      <NavBar />
      
      <div className="content-container">

        <div className="topNews-container">
          <h4>Top news</h4>
          <TopNews />
        </div>
      </div>


    </div>
  );
}

export default App;
