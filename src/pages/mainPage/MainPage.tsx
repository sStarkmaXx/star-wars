import { ChangeEvent, useState } from 'react';
import { useGetHeroesQuery } from '../../api';
import HeroCard from '../../widgets/heroCard/HeroCard';
import './MainPage.css';
import { v1 } from 'uuid';
import Loader from '../../shared/ui/loader/Loader';
import { useLazySearchHeroQuery } from '../../api/starWars.api';

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { isFetching, isError, data } = useGetHeroesQuery(currentPage);
  const [inputValue, setInputValue] = useState<string>('');
  const [searchHero, { isFetching: isSearchHero, data: searchedHero }] =
    useLazySearchHeroQuery();

  const heroId = (url: string) => {
    const arr = url.split('/');
    return arr[arr.length - 2];
  };

  const planetId = (url: string) => {
    const arr = url.split('/');
    return arr[arr.length - 2];
  };

  let pagesCount,
    dataForRender,
    btns = null;

  if (data) {
    pagesCount = Array(Math.ceil(data.count / 10));
    pagesCount.fill('');
    btns = pagesCount.map((page, index) => {
      return (
        <div
          key={index}
          className={`pagination-btn${
            index + 1 === currentPage ? ' current-page' : ''
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

  inputValue === '' ? (dataForRender = data) : (dataForRender = searchedHero);

  const searchHeroHandler = (heroName: string) => {
    const name = heroName.trim();
    if (name === '') return;
    searchHero(name);
  };

  const inputOnchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="main-page">
      <div className="search">
        Найти героя по имени
        <input
          type="text"
          className="navbar-search"
          placeholder="Введите имя героя"
          value={inputValue}
          onChange={(e) => inputOnchangeHandler(e)}
        />
        <button onClick={() => searchHeroHandler(inputValue)}>Искать</button>
      </div>
      <div className="container">
        {isFetching || isSearchHero ? (
          <Loader />
        ) : (
          <>
            {dataForRender?.results.length ? (
              <>
                {dataForRender?.results.map((hero, index) => {
                  return (
                    <HeroCard
                      key={v1()}
                      hero={hero}
                      img={`https://starwars-visualguide.com/assets/img/characters/${heroId(
                        hero.url
                      )}.jpg`}
                      planetId={planetId(hero.homeworld)}
                    />
                  );
                })}
              </>
            ) : (
              <div className="asd">Герои не найдены</div>
            )}
          </>
        )}
      </div>
      {!inputValue && (
        <div className="pagination">
          <div className="pagination-btns">{data && btns}</div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
