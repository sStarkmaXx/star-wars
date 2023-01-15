import { Route, Routes } from 'react-router-dom';
import Navbar from '../widgets/navbar/Navbar';
import './App.css';
import MainPage from '../pages/mainPage/MainPage';
import FavHeroesPage from '../pages/favouritesHeroesPage/FavHeroesPage';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/fhp" element={<FavHeroesPage />} />
      </Routes>
    </div>
  );
}

export default App;
