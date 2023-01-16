import { ChangeEvent, useState } from 'react';
import { useGetHeroesQuery } from '../../store/api/starWars.api';
import HeroCard from '../../widgets/heroCard/HeroCard';
import './MainPage.css';
import { v1 } from 'uuid';
import Loader from '../../shared/ui/loader/Loader';
import { useLazySearchHeroQuery } from '../../store/api/starWars.api';
import { getIdFromUrl } from '../../shared/utils/utils';
import { localStorageNames } from '../../shared/constants/localStorage';

const MainPage = () => {
  const savedPageNumber = localStorage.getItem(localStorageNames.pageNumber);

  const [currentPage, setCurrentPage] = useState<number>(
    savedPageNumber ? Number(savedPageNumber) : 1
  );
  const { isFetching, isError, data } = useGetHeroesQuery(currentPage);
  const [inputValue, setInputValue] = useState<string>('');
  const [searchHero, { isFetching: isSearchHero, data: searchedHero }] =
    useLazySearchHeroQuery();

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
            localStorage.setItem(
              localStorageNames.pageNumber,
              String(index + 1)
            );
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
                      img={`https://starwars-visualguide.com/assets/img/characters/${getIdFromUrl(
                        hero.url
                      )}.jpg`}
                      planetId={getIdFromUrl(hero.homeworld)}
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
