import { useEffect, useState } from 'react';
import { useGetHeroesQuery } from '../../entities/heroes';
import HeroCard from '../../widgets/heroCard/HeroCard';
import './MainPage.css';

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { isLoading, isError, data } = useGetHeroesQuery(currentPage);

  useEffect(() => {}, [currentPage]);

  return (
    <div className="main-page">
      <div className="container">
        {isLoading && <div>Loading...</div>}
        {data &&
          data.results.map((hero) => {
            return <HeroCard key={Date.now()} hero={hero} />;
          })}
      </div>
      <div className="pagination">
        <div className="pagination-btns">pagination</div>
      </div>
    </div>
  );
};

export default MainPage;
