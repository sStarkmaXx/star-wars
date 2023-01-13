import { IHero } from '../../entities/heroes/model/heroesModel';
import HeartSvg from '../../shared/ui/assets/svg/HeartSvg';
import './HeroCard.css';

type HeroCardPropsType = {
  hero: IHero;
};

const HeroCard: React.FC<HeroCardPropsType> = ({ hero }) => {
  return (
    <div className="hero-card">
      <div className="hero-img">img</div>
      <div className="hero-name">{hero.name}</div>
      <div className="hero-svg">
        <HeartSvg color={'red'} />
      </div>
    </div>
  );
};

export default HeroCard;
