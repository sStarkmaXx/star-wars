import { IHero } from '../../entities/heroes/model/heroesModel';
import HeartSvg from '../../shared/ui/assets/svg/HeartSvg';
import './HeroCard.css';

type HeroCardPropsType = {
  hero: IHero;
  img: string;
};

const HeroCard: React.FC<HeroCardPropsType> = ({ hero, img }) => {
  return (
    <div className="hero-card">
      <div className="hero-img">
        <img src={img} alt="" />
      </div>
      <div className="hero-name">{hero.name}</div>
      <div className="hero-svg">
        <HeartSvg color={'red'} />
      </div>
    </div>
  );
};

export default HeroCard;
