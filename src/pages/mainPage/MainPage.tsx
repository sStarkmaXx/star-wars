import { useEffect, useState } from 'react';
import { useGetHeroesQuery } from '../../entities/heroes';
import HeroCard from '../../widgets/heroCard/HeroCard';
import './MainPage.css';

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { isLoading, isError, data } = useGetHeroesQuery(currentPage);

  let pagesCount,
    btns = null;
  if (data) {
    pagesCount = Array(Math.round(data.count / 10));
    pagesCount.fill('');
    btns = pagesCount.map((page, index) => {
      console.log(index + 1);
      return (
        <div
          className={`pagination-btn${
            index + 1 == currentPage ? ' current-page' : ''
          }`}
          onClick={() => {
            setCurrentPage(index + 1);
          }}
        >
          {index + 1}
        </div>
      );
    });
  }

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
        <div className="pagination-btns">{data && btns}</div>
      </div>
    </div>
  );
};

export default MainPage;
