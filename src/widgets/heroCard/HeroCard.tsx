import { IHero } from '../../api/types/heroesTypes';
import { useGetPlanetQuery } from '../../api/starWars.api';
import HeartSvg from '../../shared/ui/assets/svg/HeartSvg';
import './HeroCard.css';
import Loader from '../../shared/ui/loader/Loader';

type HeroCardPropsType = {
  hero: IHero;
  img: string;
  planetId: string;
};

const HeroCard: React.FC<HeroCardPropsType> = ({ hero, img, planetId }) => {
  const { isLoading, data } = useGetPlanetQuery(planetId);

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
          <div className="hero-svg">
            <HeartSvg color={'red'} />
          </div>
        </>
      )}
    </div>
  );
};

export default HeroCard;
