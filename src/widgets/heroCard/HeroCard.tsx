import { IHero } from '../../store/api/types/heroesTypes';
import { useGetPlanetQuery } from '../../store/api/starWars.api';
import HeartSvg from '../../shared/ui/assets/svg/HeartSvg';
import './HeroCard.css';
import Loader from '../../shared/ui/loader/Loader';
import { useDispatch } from 'react-redux';
import { FVH, starWarsActions } from '../../store/starWars.slice';
import { useState } from 'react';

type HeroCardPropsType = {
  hero: IHero;
  img: string;
  planetId: string;
};

const HeroCard: React.FC<HeroCardPropsType> = ({ hero, img, planetId }) => {
  const dispatch = useDispatch();
  const { isLoading, data } = useGetPlanetQuery(planetId);

  const favouriteHeroes: IHero[] = JSON.parse(
    localStorage.getItem(FVH) ?? '[]'
  );

  let bool;

  if (favouriteHeroes) {
    const favouriteHero = favouriteHeroes.find(
      (favHero) => favHero.name === hero.name
    );
    if (favouriteHero) {
      bool = true;
    } else {
      bool = false;
    }
  }

  const [isFavouriteHero, setIsFavouriteHero] = useState(bool);

  const onClickHandler = () => {
    if (isFavouriteHero) {
      dispatch(starWarsActions.delFavouritesHeroes(hero));
      setIsFavouriteHero(false);
    } else {
      dispatch(starWarsActions.addFavouritesHeroes(hero));
      setIsFavouriteHero(true);
    }
  };

  return (
    <div className="hero-card">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="hero-img">
            <img src={img} alt="" />
          </div>
          <div className="hero-name">{hero.name}</div>
          <div className="hero-homeworld">{`Место рождения: планета ${data?.name}`}</div>
          <div className="hero-svg" onClick={onClickHandler}>
            <HeartSvg color={isFavouriteHero ? 'red' : 'white'} />
          </div>
        </>
      )}
    </div>
  );
};

export default HeroCard;
