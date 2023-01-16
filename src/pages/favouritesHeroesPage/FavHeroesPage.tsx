import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import HeroCard from '../../widgets/heroCard/HeroCard';
import { v1 } from 'uuid';
import './FavHeroesPage.css';
import { starWarsActions } from '../../store/starWars.slice';
import { useState } from 'react';
import { getIdFromUrl } from '../../shared/utils/utils';
import { localStorageNames } from '../../shared/constants/localStorage';

const FavHeroesPage = () => {
  const dispatch = useDispatch();
  const savedGenderFilter = localStorage.getItem(
    localStorageNames.genderFilter
  );
  const [gender, setGender] = useState(savedGenderFilter ?? 'all');

  const { favouritesHeroes } = useSelector(
    (state: RootState) => state.favouritesHeroes
  );

  const { filteredHeroes } = useSelector(
    (state: RootState) => state.favouritesHeroes
  );

  const onclickHandler = (gender: string) => {
    if (gender !== 'all') {
      dispatch(starWarsActions.filterHeroesByGender(gender));
    }
    localStorage.setItem(localStorageNames.genderFilter, gender);
    setGender(gender);
  };

  let dataForRender;

  if (gender === 'all') {
    dataForRender = favouritesHeroes;
  } else {
    dataForRender = filteredHeroes;
  }

  return (
    <div className="favHeroes-page">
      <div className="сhoice-gender">
        Выбрать пол героев:
        <div
          className={`сhoice-gender-btn${gender === 'all' ? ' checked' : ''}`}
          onClick={() => onclickHandler('all')}
        >
          Все
        </div>
        <div
          className={`сhoice-gender-btn${gender === 'male' ? ' checked' : ''}`}
          onClick={() => onclickHandler('male')}
        >
          Мужской
        </div>
        <div
          className={`сhoice-gender-btn${
            gender === 'female' ? ' checked' : ''
          }`}
          onClick={() => onclickHandler('female')}
        >
          Женский
        </div>
        <div
          className={`сhoice-gender-btn${gender === 'n/a' ? ' checked' : ''}`}
          onClick={() => onclickHandler('n/a')}
        >
          Без пола
        </div>
      </div>
      <div className="container">
        {dataForRender.length ? (
          <>
            {dataForRender.map((hero, index) => {
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
          <div className="asd">Любимых героев нет</div>
        )}
      </div>
    </div>
  );
};
export default FavHeroesPage;
