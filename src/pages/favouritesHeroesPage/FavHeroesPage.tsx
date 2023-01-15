import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import HeroCard from '../../widgets/heroCard/HeroCard';
import { v1 } from 'uuid';

const FavHeroesPage = () => {
  const { favouritesHeroes } = useSelector(
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

  return (
    <div className="main-page">
      <div className="search">Отфильтровать героев по полу</div>
      <div className="container">
        {favouritesHeroes.length ? (
          <>
            {favouritesHeroes.map((hero, index) => {
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
