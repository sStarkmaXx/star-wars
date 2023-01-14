import { useState } from 'react';
import { useGetHeroesQuery } from '../../entities/heroes';
import HeroCard from '../../widgets/heroCard/HeroCard';
import './MainPage.css';
import { v1 } from 'uuid';

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { isLoading, isError, data } = useGetHeroesQuery(currentPage);
  const heroId = (url: string) => {
    const arr = url.split('/');
    return arr[arr.length - 2];
  };

  let pagesCount,
    btns = null;
  if (data) {
    pagesCount = Array(Math.ceil(data.count / 10));
    pagesCount.fill('');
    btns = pagesCount.map((page, index) => {
      return (
        <div
          key={index}
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

  console.log(useGetHeroesQuery(currentPage).isLoading);

  return (
    <div className="main-page">
      <div className="container">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          data?.results.map((hero, index) => {
            return (
              <HeroCard
                key={v1()}
                hero={hero}
                img={`https://starwars-visualguide.com/assets/img/characters/${
                  heroId(hero.url)
                  // currentPage == 1 ? index + 1 : 10 * currentPage + index + 1
                }.jpg`}
              />
            );
          })
        )}
      </div>
      <div className="pagination">
        <div className="pagination-btns">{data && btns}</div>
      </div>
    </div>
  );
};

export default MainPage;
