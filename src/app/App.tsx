import { Route, Routes } from 'react-router-dom';
import Navbar from '../widgets/navbar/Navbar';
import './App.css';
import MainPage from '../pages/mainPage/MainPage';
import FavHeroesPage from '../pages/favouritesHeroesPage/FavHeroesPage';
import { useGetHeroesQuery } from '../entities/heroes/api/heroes.api';

function App() {
  const { isLoading, isError, data } = useGetHeroesQuery(1);

  console.log(data);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/fhp" element={<FavHeroesPage />} />
      </Routes>
    </div>
  );
}

export default App;
