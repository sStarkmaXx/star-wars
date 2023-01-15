import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import HeroCard from '../../widgets/heroCard/HeroCard';
import { v1 } from 'uuid';
import './FavHeroesPage.css';
import { starWarsActions } from '../../store/starWars.slice';
import { useState } from 'react';

const FavHeroesPage = () => {
  const dispatch = useDispatch();
  const [gender, setGender] = useState('all');

  const { favouritesHeroes } = useSelector(
    (state: RootState) => state.favouritesHeroes
  );

  const { filteredHeroes } = useSelector(
    (state: RootState) => state.favouritesHeroes
  );

  const heroId = (url: string) => {
    const arr = url.split('/');
    return arr[arr.length - 2];
  };

  const planetId = (url: string) => {
    const arr = url.split('/');
    return arr[arr.length - 2];
  };

  const onclickHandler = (gender: string) => {
    dispatch(starWarsActions.filterHeroesByGender(gender));
    setGender(gender);
    console.log(filteredHeroes);
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
        <input
          type="radio"
          id="genderChoice1"
          name="gender"
          value="all"
          checked={gender === 'all'}
          onClick={() => setGender('all')}
        />
        <label htmlFor="genderChoice1">Все</label>
        <input
          type="radio"
          id="genderChoice2"
          name="gender"
          value="male"
          checked={gender === 'male'}
          onClick={() => onclickHandler('male')}
        />
        <label htmlFor="genderChoice2">Мужской</label>
        <input
          type="radio"
          id="genderChoice3"
          name="gender"
          value="female"
          checked={gender === 'female'}
          onClick={() => onclickHandler('female')}
        />
        <label htmlFor="genderChoice3">Женский</label>
      </div>
      <div className="container">
        {dataForRender.length ? (
          <>
            {dataForRender.map((hero, index) => {
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
          <div className="asd">Любимых героев нет</div>
        )}
      </div>
    </div>
  );
};
export default FavHeroesPage;
