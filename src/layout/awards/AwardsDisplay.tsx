import { useAppSelector } from '../../redux/hooks';
import AwardType from '../../types/awardType';
import Award from './award-component/Award';
import './awards.css';

const AwardsDisplay: React.FC = () => {
  const awardsList: AwardType[] = useAppSelector((state)=> state.awardsControl.awards);

  return (
    <div className='awards__display-wrapper'>
      <h2 className='title'>Awards</h2>
      <div className='award__cards-wrapper'>
        {awardsList.map((award)=> (
          <Award awardData={award}/>
        ))}
      </div>
    </div>
  );
};

export default AwardsDisplay;